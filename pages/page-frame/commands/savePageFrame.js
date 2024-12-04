function() {
  simplyApp.actions.savePageFrame(editor.pageData.component)
    .then(function() {
    editor.pageData.alerts.unshift({
      "data-simply-template" : "info",
      "message" : "Page frame saved.",
      "state" : "new"
    });
  });
}