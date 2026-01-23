function() {
  simplyApp.actions.listImports()
    .then(function(components) {
    editor.pageData.components = components;
    editor.pageData.page = "Imports";
  });
}