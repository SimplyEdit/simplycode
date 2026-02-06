async function (importUrl, targetPath) {
  const zipProxyUrl = 'zithub.pother.ca'

  const url = new URL(importUrl);

  const response = await fetch(url, {
    "mode": "same-origin" // without this, gitlab returns a 406. Github does not seem to mind if we send this
  });
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
    subpathFilename.shift(); // github adds the repo name as the directory in the zip, remove that; gitlab does the same.
    subpathFilename = subpathFilename.join("/");
 
    await simplyRawApi.putRaw(targetPath + subpathFilename, {}, contents);
  }
}