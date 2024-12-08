function(params) {
  editor.pageData.app = {};
  simplyApp.actions.getAppData()
    .then(function(appData) {
    editor.pageData.app = appData;
  })
    .then(function() {
    return simplyApp.actions.getBuilder(params.component);
  })
    .then(function(parts) {
    var component = {
      id : params.component
    };

    parts = parts.filter(function(part) {
      if (part.id == "meta") {
        component = JSON.parse(part.contents);
        component.id = params.component;
        return false;
      }
      return true;
    });
    if (typeof component.parts === "undefined") {
      component.parts = {
        builderTemplates : []
      };
    }
    var count = {};
    parts.forEach(function(part) {
      component.parts[part.id] = JSON.parse(part.contents);
      count[part.id] = component.parts[part.id].length;
    });
    editor.pageData.component = component;
    editor.pageData.parts = parts;
    editor.pageData.count = count;
    editor.pageData.page = "Edit builder";
  });
}