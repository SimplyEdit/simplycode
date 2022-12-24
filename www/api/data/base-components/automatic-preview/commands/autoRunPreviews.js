function(el) {
  // var previewRunners = document.querySelectorAll(".sb-component[open] iframe.sb-preview,iframe.sb-full-preview");
  var previewRunners = document.querySelectorAll("iframe.sb-full-preview");
  previewRunners.forEach(function(previewRunner) {
    previewRunner.contentWindow.document.previewRunner = previewRunner;
    previewRunner.parentNode.querySelectorAll(".sb-preview-code [data-simply-list-item]:last-child .trailingComma").forEach(function(element) {
      element.remove();
    });
    simplyApp.commands.resetPreview(previewRunner)
      .then(function(previewRunner) {
      previewRunner.contentWindow.document.open();
      previewRunner.contentWindow.document.write(previewRunner.parentNode.querySelector(".sb-preview-code").innerText);
      previewRunner.contentWindow.document.close();
    });
  });

  var previewRunners = document.querySelectorAll("iframe.sb-component-preview");
  previewRunners.forEach(function(previewRunner) {
    previewRunner.contentWindow.document.previewRunner = previewRunner;
    previewRunner.parentNode.querySelectorAll(".sb-preview-code [data-simply-list-item]:last-child .trailingComma").forEach(function(element) {
      element.remove();
    });
    simplyApp.commands.resetPreview(previewRunner)
      .then(function(previewRunner) {
      previewRunner.contentWindow.document.open();
      previewRunner.contentWindow.document.write(document.querySelector(".sb-preview-app-head").innerText);
      previewRunner.contentWindow.document.write(previewRunner.parentNode.querySelector(".sb-preview-code").innerText);
      previewRunner.contentWindow.document.write(document.querySelector(".sb-preview-app-foot").innerText);
      previewRunner.contentWindow.document.close();
      previewRunner.contentWindow.addEventListener("simply-content-loaded", function() {
        var previewData = previewRunner.parentNode.querySelector(".sb-preview-data").innerText;
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