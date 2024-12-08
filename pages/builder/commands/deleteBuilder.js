function() {
  if (!confirm("Delete builder?")) {
    return;
  }
  simplyApp.actions.deleteBuilder(
    editor.pageData.component.id
  )
    .then(function() {
    editor.pageData.alerts.unshift({
      "data-simply-template" : "info",
      "message" : "Builder deleted.",
      "state" : "new"
    });
    document.location.hash="builders/";
  });
}