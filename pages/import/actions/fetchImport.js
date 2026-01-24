async function (importUrl, targetPath) {
  const zipProxyUrl = 'zithub.pother.ca'

  // GitHub does not send CORS headers, so a custom build proxy is used
  const url = new URL(importUrl);
  if (url.hostname.endsWith('github.com')) {
    url.pathname = `${url.href}`;
    url.hostname = zipProxyUrl;
  }

  const response = await fetch(url);
  let blob = await response.blob();
  let arrayBuffer = blob.arrayBuffer();

  const files = {}

  const zip = await JSZip.loadAsync(arrayBuffer);
  const zipFiles = Object.values(zip.files);

  for (const file of zipFiles) {
    if (file.dir === false) {
      files[file.name] = await file.async('blob');
    }
  }

  for (const [ fileName, blob ] of Object.entries(files)) {
    const bytes = await blob.arrayBuffer();
    let contents, type;

    try {
      type = 'text/plain;charset=utf-8';
      contents = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    } catch (e) {
      type = 'application/octet-stream';
      contents = blob;
    }

    let subpathFilename = fileName.split("/");
    let zipProvider = new URL(importUrl);
    if (zipProvider.hostname.endsWith('github.com')) {
      subpathFilename.shift(); // github adds the repo name as the directory in the zip, remove that;
    }
    subpathFilename = subpathFilename.join("/");
 
    await simplyRawApi.putRaw(targetPath + subpathFilename, {}, contents);
  }
}