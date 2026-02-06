function() {
  if (!simplyApp.commands.preSaveCheck()) {
    return;
  }
  simplyApp.actions.saveImport(editor.pageData.component)
    .then(function() {
    editor.pageData.alerts.unshift({
      "data-simply-template" : "info",
      "message" : "Import saved.",
      "state" : "new"
    });
  });
}