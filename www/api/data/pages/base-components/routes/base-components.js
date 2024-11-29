function() {
  simplyApp.actions.listBaseComponents()
    .then(function(components) {
    editor.pageData.components = components;
    editor.pageData.page = "Base-components";
  });
}