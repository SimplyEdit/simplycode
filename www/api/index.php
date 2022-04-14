<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	require_once('../../lib/config.php');

	$request  = http::request();
	$requestTarget = $request['target'];
	$requestTarget = preg_replace("/^\/api/", "", $requestTarget);
	$path     = filesystem::path($requestTarget);
	$dirname  = dirname($path);
	$filename = basename($path);

	function guid() {
		return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
	}
	function tagId() {
		return sprintf('%03d-%03d', mt_rand(0, 999), mt_rand(0, 999));
	}
	try {
		switch($request['method']) {
			case 'OPTIONS':
				output('ok',200);
			break;
			case 'GET':
				if (filesystem::exists($path)) {
					list($realdir, $realfile) = filesystem::realpaths($dirname, $filename);
					if (is_dir($realfile)) {
						$files = scandir($realfile);
						$files = array_filter($files, function($file) {
							if ($file == '.' || $file == '..') {
								return false;
							}
							return true;
						});
						$result = [];
						foreach ($files as $filename) {
							if (filesystem::exists($path . '/' . $filename . '/meta')) {
								$data = json_decode(filesystem::read($path . '/' . $filename, "meta"), true);
							}
							$data['id'] = $filename;
                                                        $data['ctime'] = filesystem::ctime($path, $filename);
                                                        $data['ctime-human'] = strftime("%c", $data['ctime']);
					                $data['contents'] = filesystem::read($path, $filename);
							$result[] = $data;
						}
						output($result, 200);
					} else {
						filenotfound($path); // don't allow access to x.json with ".json" in the request
					}
				} else {
					if (filesystem::exists($dirname.'/'.$filename)) {
						$result = [];
						$result['id'] = $filename;

                                                $result['ctime'] = filesystem::ctime($dirname, $filename);
                                                $result['ctime-human'] = strftime("%c", $data['ctime']);
                                                $result['mtime'] = filesystem::mtime($dirname, $filename);
                                                $result['mtime-human'] = strftime("%c", $data['mtime']);
				                $result['contents'] = filesystem::read($dirname, $filename);
						output($result, 200);
					} else {
						filenotfound($path);
					}
				}
			break;
			case 'POST':
				if (filesystem::exists($path)) {
					list($realdir, $realfile) = filesystem::realpaths($dirname, $filename);
					if (is_dir($realfile)) {
						$exists = true;
						while ($exists) {
							$newId = tagId();
							$newFilename = $newId;
							$exists = filesystem::exists($path . $newFilename);
						}

						// at this point, we are sure that the generated filename does not yet exists, so we can write it;
						filesystem::put($path, $newFilename);
						output($newId, 200);
					}
				}
			break;
			case 'PUT':
				if (filesystem::put($dirname, $filename)) {
					output('ok',200);
				} else {
					error(new \Exception("unexpected result from write",501));
				}
			break;
			case 'DELETE':
				if (filesystem::exists($path) || filesystem::exists($dirname . "/" . $filename)) {
					list($realdir, $realfile) = filesystem::realpaths($dirname, $filename);

					if (is_dir($realfile)) {
						$files = scandir($realfile);
						$files = array_filter($files, function($file) {
							if ($file == '.' || $file == '..') {
								return false;
							}
							return true;
						});
						foreach ($files as $file) {
							filesystem::delete($path, $file);
						}
						filesystem::delete($path);
						output('deleted', 200);
					} else {
						filesystem::delete($dirname, $filename);
						output('deleted', 200);
					}
				} else {
					output('not found', 4040);
				}
			break;
		}
	} catch( \Exception $e) {
		error($e);
	}

	function output($data, $status) {
		http::response($status, $data);		
	}

	function error($e) {
		output(["error" => $e->getCode(), "message" => $e->getMessage()], 501);		
	}

	function filenotfound($path) {
		output(["error" => 404, "message" => "File not found"], 404);
	}
