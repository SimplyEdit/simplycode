function() {
    simplyApp.actions.listComponents()
    .then(function(components) {
        editor.pageData.components = components;
        editor.pageData.page = "List components";
    });
}