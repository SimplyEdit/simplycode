function() {
  if (!confirm("Delete component?")) {
    return;
  }
  simplyApp.actions.deleteComponent(
    editor.pageData.component.id
  )
  .then(function() {
    editor.pageData.alerts.unshift({
      "data-simply-template" : "info",
      "message" : "Component deleted.",
      "state" : "new"
    });
    document.location.hash="components/";
  });
}