function() {
  if (!simplyApp.commands.preSaveCheck()) {
    return;
  }
  simplyApp.actions.saveComponent(editor.pageData.component)
  .then(function() {
    editor.pageData.alerts.unshift({
      "data-simply-template" : "info",
      "message" : "Component saved.",
      "state" : "new"
    });
  });
}