function() {
  var appHtml = document.querySelector(".simplycode-preview-code").innerText;
  appHtml = appHtml.replaceAll(/^(\n)+/g, '');
  appHtml = appHtml.replaceAll(/(\n)+/g, '\n');
  simplyApp.actions.saveAppHtml(appHtml)
  .then(function() {
    editor.pageData.alerts.unshift({
      "data-simply-template" : "info",
      "message" : "App published!",
      "state" : "new"
    });
  })
  .then(function() {
    simplyApp.commands.runBuilders();
  });
}