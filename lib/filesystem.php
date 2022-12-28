<?php
class fsException extends \Exception {}

class filesystem {

	/*
	TODO;
	- get hash of file
	- conditional put - only if hashes match
	x save a log? with jsondiff?
	*/

	private static $allowed = [];
	private static $checks  = [];
	public  static $basedir = __DIR__;

	public static function basedir($basedir)
	{
		self::$basedir = $basedir;
	}

	public static function allow($dirname, $mimetype)
	{
		self::$allowed[$dirname][] = $mimetype;
	}

	public static function path($path) {
		$path = implode('/', 
			array_filter( 
				explode( '/', $path), 
				function($el) {
					switch($el) {
						case '':
						case '.':
						case '..':
							return false;
						break;
						default:
							return true;
						break;
					}
				}
			)	
		);
		return ($path) ? '/'.$path.'/' : '/';
	}

	public static function append() {
		return self::path(implode('/', func_get_args()));
	}

	public static function realpaths($dirname, $filename)
	{
		$realfile = realpath(self::append(self::$basedir, $dirname) . $filename );
		$realdir  = realpath(self::append(self::$basedir, $dirname));

		if ( !$realdir ) {
			$realdir = self::append(self::$basedir, $dirname);
		} else {
			$realdir .= '/';
		}

		if ( !$realfile ) {
			$realfile = $realdir . $filename;
		}

		if ( strpos($realfile, self::$basedir)!==0
			|| strpos($realdir, self::$basedir)!==0 ) {
			throw new fsException('Attempted file access outside base directory', 110);
		}
		return [ $realdir, $realfile ];
	}

	public static function put($dirname, $filename=null, $hash=null)
	{
		clearstatcache(true);
		list($realdir, $realfile)=self::realpaths($dirname, $filename);
		if (!file_exists($realdir)) {
			clearstatcache(true);
			$res = mkdir($realdir, 0755, true);
			if ($res == false) {
				self::dirNotWritable($realdir);
			}
		}

		if ( !is_writable($realdir) ){
			self::dirNotWritable($dirname);
		} else if ( $filename ) {
			$exists = file_exists($realfile);
			if (
				($exists === true && is_writable($realfile) ) ||
				$exists === false
			){
				return self::passthru($dirname, $filename, $hash);
			} else {
				self::fileNotWritable($dirname.$filename);
			}
		}
		return true;
	}

	public static function write($dirname, $filename=null, $contents=null)
	{
		list($realdir, $realfile)=self::realpaths($dirname, $filename);
		if (!file_exists($realdir)) {
			$res = mkdir($realdir, 0755, true);
			if ($res == false) {
				self::dirNotWritable($realdir);
			}
		}

		if ( !is_writable($realdir) ){
			self::dirNotWritable($dirname);
		} else if ( $filename ) {
			$exists = file_exists($realfile);
			if (
				($exists === true && is_writable($realfile) ) ||
				$exists === false
			){
				$res = file_put_contents($realfile, $contents);
				if ($res === false ) {
					self::fileNotWritable($dirname.$filename);
				}
			} else {
				self::fileNotWritable($dirname.$filename);
			}
		}
		return true;
	}

	public static function writeAppend($dirname, $filename=null, $contents=null)
	{
		list($realdir, $realfile)=self::realpaths($dirname, $filename);
		if (!file_exists($realdir)) {
			$res = mkdir($realdir, 0755, true);
			if ($res == false) {
				self::dirNotWritable($realdir);
			}
		}

		if ( !is_writable($realdir) ){
			self::dirNotWritable($dirname);
		} else if ( $filename ) {
			$exists = file_exists($realfile);
			if (
				($exists === true && is_writable($realfile) ) ||
				$exists === false
			){
				$res = file_put_contents($realfile, $contents, FILE_APPEND);
				if ($res === false ) {
					self::fileNotWritable($dirname.$filename);
				}
			} else {
				self::fileNotWritable($dirname.$filename);
			}
		}
		return true;
	}

	public static function copy($dirname, $filename, $dirname2, $filename2) {
		list($realdir, $realfile)=self::realpaths($dirname, $filename);
		if (!file_exists($realdir)) {
			self::fileNotReadable($dirname.$filename);
		}
		list($realdir2, $realfile2)=self::realpaths($dirname2, $filename2);
		if (!file_exists($realdir2)) {
			$res = mkdir($realdir2, 0755, true);
			if ($res == false) {
				self::dirNotWritable($realdir2);
			}
		}

		if ( !is_writable($realdir2) ){
			self::dirNotWritable($dirname2);
		} else if ( $filename2 ) {
			$res = copy( $realfile, $realfile2);
			if ($res === false ) {
				self::fileNotWritable($dirname2.$filename2);
			}
		}
		return true;
	}

	public static function delete($dirname, $filename=null)
	{
		clearstatcache(true);
		list($realdir, $realfile)=self::realpaths($dirname, $filename);
		self::runChecks('delete', self::append($dirname,$filename), $realfile);
		if ( file_exists($realfile ) ) {
			if ( is_dir($realfile) ) {
				rmdir($realfile);
			} else {
				unlink($realfile);
			}
		} else {
			throw new fsException('File not found '.self::append($dirname,$filename), 1051);
		}
	}

	public static function get($dirname, $filename)
	{
		list($realdir, $realfile)=self::realpaths($dirname, $filename);
		self::runChecks('get', self::append($dirname,$filename), $realfile);
		if ( file_exists($realfile) ) {
			return file_get_contents($realfile);
		} else {
			throw new fsException('File not found '.self::append($dirname,$filename), 1052);
		}
	}

	public static function readfile($dirname, $filename)
	{
		list($realdir, $realfile)=self::realpaths($dirname, $filename);
		self::runChecks('get', self::append($dirname,$filename), $realfile);
		if ( file_exists($realfile) ) {
			readfile($realfile);
		} else {
			throw new fsException('File not found '.self::append($dirname,$filename), 1053);
		}
	}

	public static function read($dirname, $filename) {
		list($realdir, $realfile)=self::realpaths($dirname, $filename);
		self::runChecks('get', self::append($dirname,$filename), $realfile);
		if ( file_exists($realfile) ) {
			return file_get_contents($realfile);
		} else {
			throw new fsException('File not found '.self::append($dirname,$filename), 1054);
		}
	}

	public static function ctime($dirname, $filename) {
		list($realdir, $realfile)=self::realpaths($dirname, $filename);
		self::runChecks('get', self::append($dirname,$filename), $realfile);
		if ( file_exists($realfile) ) {
			return filectime($realfile);
		} else {
			throw new fsException('File not found '.self::append($dirname,$filename), 1055);
		}
	}

	public static function mtime($dirname, $filename) {
		list($realdir, $realfile)=self::realpaths($dirname, $filename);
		self::runChecks('get', self::append($dirname,$filename), $realfile);
		if ( file_exists($realfile) ) {
			return filemtime($realfile);
		} else {
			throw new fsException('File not found '.self::append($dirname,$filename), 1056);
		}
	}

	public static function check($method, $filename, $callback)
	{
		self::$checks[$method][$filename][] = $callback;
	}

	private static function isAllowed($dirname, $filename, $tempfile)
	{
		$allowed = false;
		foreach ( self::$allowed as $path => $mimetypes ) {
			if ( strpos($dirname, $path)===0 ) {
				$allowed = true;
				break;
			}
		}
		if ( !$allowed ) {
			throw new fsException('Access denied for '.$dirname.$filename, 106);
		}
		$finfo      = new finfo(FILEINFO_MIME);
		$mimetype   = $finfo->file($tempfile);
		$mimetypes[]= 'inode/x-empty';
		$mimetypeRe = '{'.implode('|', $mimetypes).'}i';
		if ( !preg_match($mimetypeRe, $mimetype) ) {
			throw new fsException('Files with mimetype '.$mimetype.' are not allowed in '.$dirname, 108);
		}
		return true;
	}

	private static function runChecks($method, $filename, $tempfile)
	{
		if ( !isset(self::$checks[$method]) ) {
			return;
		}
		foreach ( self::$checks[$method] as $path => $checks ) {
			foreach ( $checks as $callback ) {
				if ( strpos($filename, $path)===0 ) {
					$callback($filename, $tempfile);
				}
			}
		}
	}

	private static function dirNotWritable($dirname)
	{
		// FIXME: try to find out why it is not writable
		// check if dir exists
		// check if dir is writable
		// check if dirname is a directory
		// check permissions on dirname
		// check owner and current user

		$error = error_get_last();
		var_dump($error);
		throw new fsException("Directory $dirname is not writable: $error", 102);
	}

	private static function fileNotWritable($file)
	{
		// FIXME: try to find out why it is not writable
		$error = error_get_last();
		throw new fsException("File $file is not writeable: $error", 103);
	}

	private static function renameFailed($file, $tempfile)
	{
		// FIXME: try to find out why the rename failed
		unlink($tempfile);
		throw new fsException('Could not move file contents to '.$file, 104);
	}

	public static function exists($filename) {
		$realfile = realpath(self::$basedir . $filename );
		return file_exists($realfile);
	}

	public static function is_dir($filename) {
		$realfile = realpath(self::$basedir . $filename );
		return is_dir($realfile);
	}

	public static function scandir($filename) {
		$realfile = realpath(self::$basedir . $filename );
		return scandir($realfile);
	}

	private static function passthru($dirname, $filename, $hash=null)
	{
		clearstatcache(true);
		list($realdir,$realfile)=self::realpaths($dirname,$filename);
		$lock = self::lock($realfile);

		if ( !$lock ) {
			throw new fsException('Could not lock '.$dirname.'/'.$filename.' for writing', 109);
		}
		/* PUT data comes in on the stdin stream */
		$in       = fopen("php://input", "r");

		/* Open a file for writing */
		$tempfile = tempnam($realdir, 'put-');
		chmod($tempfile, 0644);
		$out      = fopen($tempfile, "w");
		$res      = stream_copy_to_stream($in,$out);

		/* Close the streams */
		fclose($out);
		fclose($in);

		$exception = false;
		try {
			if ($res!==false) {
				if ( !self::isAllowed($dirname, $filename, $tempfile) ) {
					throw new fsException('Access denied for '.self::append($dirname,$filename), 106);
				}
				self::runChecks('put', self::append($dirname,$filename), $tempfile);
				$res = rename($tempfile, $realfile);
				if ($res == false) {
					self::renameFailed(self::append($dirname,$filename), $tempfile);
				}
			} else {
			}
		} catch( \Exception $e ) {
			$exception = $e;
		} finally {
			self::unlock($lock);
			@unlink($tempfile);
		}
		if ( $exception ) {
			throw $exception;
		}
		return true;
	}

	private static function lock($filename)
	{
		clearstatcache(true);
		$fp = fopen($filename.'.lock', 'w');
		if ( $fp && flock($fp, LOCK_EX ) ) {
			return [
				'resource' => $fp,
				'filename' => $filename
			];
		}
		return false;
	}

	private static function unlock($lock)
	{
		flock($lock['resource'], LOCK_UN);
		fclose($lock['resource']);
		unlink($lock['filename'].'.lock');
	}
	
	public static function cached($cacheName, $cacheTime) {
		$cacheFile = self::$basedir . "/cache/" . $cacheName;
		// Serve from the cache if it is younger than $cachetime
		if (file_exists($cacheFile) && time() - $cacheTime < filemtime($cacheFile)) {
		//    echo "<!-- Cached copy, generated ".date('H:i', filemtime($cachefile))." -->\n";
			readfile($cacheFile);
			return true;
		} else {
			ob_start(); // Start the output buffer
			return false;
		}
	}

	public static function saveCache($cacheName) {
		$cacheDir = self::$basedir . "/cache/";
		if (file_exists($cacheDir)) {
			// Cache the contents to a cache file
			$cacheFile = self::$basedir . "/cache/" . $cacheName;
			$tempFile = tempnam(self::$basedir . "/cache/", $cacheName);

			$cached = fopen($tempFile, 'w');
			fwrite($cached, ob_get_contents());
			fclose($cached);
			if (file_exists($tempFile)) {
				rename($tempFile, $cacheFile);
			}
		}
		ob_end_flush(); // Send the output to the browser
	}
}
