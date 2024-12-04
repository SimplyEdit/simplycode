function(el) {
  var previewRunners = document.querySelectorAll("iframe.simplycode-full-preview");
  previewRunners.forEach(function(previewRunner) {
    previewRunner.contentWindow.document.previewRunner = previewRunner;
    simplyApp.commands.resetPreview(previewRunner)
      .then(function(previewRunner) {
      previewRunner.contentWindow.document.open();
      previewRunner.contentWindow.document.write(previewRunner.parentNode.querySelector(".simplycode-preview-code").innerText);
      previewRunner.contentWindow.document.close();
    });
  });

  var previewRunners = document.querySelectorAll("iframe.simplycode-component-preview");
  previewRunners.forEach(function(previewRunner) {
    previewRunner.contentWindow.document.previewRunner = previewRunner;
    simplyApp.commands.resetPreview(previewRunner)
      .then(function(previewRunner) {
      previewRunner.contentWindow.document.open();
      previewRunner.contentWindow.document.write(previewRunner.parentNode.querySelector(".simplycode-preview-code").innerText);
      previewRunner.contentWindow.document.close();
      previewRunner.contentWindow.addEventListener("simply-content-loaded", function() {
        var previewData = previewRunner.parentNode.querySelector(".simplycode-preview-data").innerText;
        try {
          previewData = JSON.parse(previewData);
        } catch(e) {
          previewData = {};
        }
        previewRunner.contentWindow.editor.pageData = previewData;
      });
    });
  });
}