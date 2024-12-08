function() {
  simplyApp.actions.listBuilders()
    .then(function(components) {
    editor.pageData.components = components;
    editor.pageData.page = "Builders";
  });
}