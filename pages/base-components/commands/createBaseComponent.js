function() {
  var newComponent = editor.pageData.newComponent;
  simplyApp.actions.saveBaseComponent(newComponent)
    .then(function() {
    editor.pageData.alerts.unshift({
      "data-simply-template" : "info",
      "message" : "BaseComponent created.",
      "state" : "new"
    });
    document.location.hash="base/" + newComponent.id;
  });
}