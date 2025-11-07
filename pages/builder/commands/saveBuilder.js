function() {
  if (!simplyApp.commands.preSaveCheck()) {
    return;
  }
  simplyApp.actions.saveBuilder(editor.pageData.component)
    .then(function() {
    editor.pageData.alerts.unshift({
      "data-simply-template" : "info",
      "message" : "Builder saved.",
      "state" : "new"
    });
  });
}