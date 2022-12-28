function() {
  if (!confirm("Delete page?")) {
    return;
  }
  simplyApp.actions.deletePage(
    editor.pageData.component.id
  )
    .then(function() {
    editor.pageData.alerts.unshift({
      "data-simply-template" : "info",
      "message" : "Page deleted.",
      "state" : "new"
    });
    document.location.hash="pages/";
  });
}