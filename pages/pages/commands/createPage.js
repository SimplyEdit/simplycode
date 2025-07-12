function() {
  if (!simplyApp.commands.preSaveCheck()) {
    return;
  }
  var newComponent = editor.pageData.newComponent;
  simplyApp.actions.savePage(newComponent)
    .then(function() {
    editor.pageData.alerts.unshift({
      "data-simply-template" : "info",
      "message" : "Page created.",
      "state" : "new"
    });
    document.location.hash="pages/" + newComponent.id;
  });
}