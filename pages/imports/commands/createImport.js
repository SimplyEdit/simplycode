function() {
  if (!simplyApp.commands.preSaveCheck()) {
    return;
  }
  var newComponent = editor.pageData.newComponent;
  simplyApp.actions.saveImport(newComponent)
    .then(function() {
    editor.pageData.alerts.unshift({
      "data-simply-template" : "info",
      "message" : "Import created.",
      "state" : "new"
    });
    document.location.hash="imports/" + newComponent.id;
  });
}