function() {
  if (!simplyApp.commands.preSaveCheck()) {
    return;
  }
  var newComponent = editor.pageData.newComponent;
  simplyApp.actions.saveComponent(newComponent)
    .then(function() {
    editor.pageData.alerts.unshift({
      "data-simply-template" : "info",
      "message" : "Component created.",
      "state" : "new"
    });
    document.location.hash="components/" + newComponent.id;
  });
}