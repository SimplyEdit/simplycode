function(params) {
  simplyApp.actions.getBaseComponent(params.component)
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
        headHtml : [],
        bodyHtml : [],
        footHtml : [],
        commands : [],
        actions : [],
        shortcuts : [],
        routes : [],
        rawApi : []
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
    editor.pageData.page = "Edit base component";
  });
}