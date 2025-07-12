function() {
  if (!simplyApp.commands.preSaveCheck()) {
    return;
  }
  var newComponent = editor.pageData.newComponent;
  simplyApp.actions.saveBuilder(newComponent)
    .then(function() {
    editor.pageData.alerts.unshift({
      "data-simply-template" : "info",
      "message" : "Builder created.",
      "state" : "new"
    });
    document.location.hash="builders/" + newComponent.id;
  });
}