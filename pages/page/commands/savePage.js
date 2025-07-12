function() {
  if (!simplyApp.commands.preSaveCheck()) {
    return;
  }
  simplyApp.actions.savePage(editor.pageData.component)
    .then(function() {
    editor.pageData.alerts.unshift({
      "data-simply-template" : "info",
      "message" : "Page saved.",
      "state" : "new"
    });
  });
}