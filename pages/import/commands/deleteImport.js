function() {
  if (!confirm("Delete import?")) {
    return;
  }
  simplyApp.actions.deleteImport(
    editor.pageData.component.id
  )
    .then(function() {
    editor.pageData.alerts.unshift({
      "data-simply-template" : "info",
      "message" : "Import deleted.",
      "state" : "new"
    });
    document.location.hash="imports/";
  });
}