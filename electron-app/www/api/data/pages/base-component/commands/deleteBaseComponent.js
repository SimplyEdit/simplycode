function() {
  if (!confirm("Delete base component?")) {
    return;
  }
  simplyApp.actions.deleteBaseComponent(
    editor.pageData.component.id
  )
    .then(function() {
    editor.pageData.alerts.unshift({
      "data-simply-template" : "info",
      "message" : "BaseComponent deleted.",
      "state" : "new"
    });
    document.location.hash="base/";
  });
}