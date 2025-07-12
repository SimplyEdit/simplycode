function() {
  if (!simplyApp.commands.preSaveCheck()) {
    return;
  }
  simplyApp.actions.saveBaseComponent(editor.pageData.component)
    .then(function() {
    editor.pageData.alerts.unshift({
      "data-simply-template" : "info",
      "message" : "BaseComponent saved.",
      "state" : "new"
    });
  });
}