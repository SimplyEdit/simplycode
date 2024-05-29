function() {
  simplyApp.actions.listPages()
    .then(function(components) {
    editor.pageData.components = components;
    editor.pageData.page = "Pages";
  });
}