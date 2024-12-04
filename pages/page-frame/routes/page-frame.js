function() {
  simplyApp.actions.getPageFrame()
    .then(function(parts) {
    var component = {
      id : "page-frame"
    };

    parts = parts.filter(function(part) {
      if (part.id == "meta") {
        component = JSON.parse(part.contents);
        component.id = "page-frame";
        return false;
      }
      return true;
    });
    if (typeof component.parts === "undefined") {
      component.parts = {};
    }
    parts.forEach(function(part) {
      component.parts[part.id] = part.contents;
    });
    editor.pageData.component = component;
    editor.pageData.count = {};
    editor.pageData.page = "Edit page frame";
  });
}