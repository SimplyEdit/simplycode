function(component) {
  var promises = [];
  for (var name in component.parts) {
    if (component.parts[name].length) { 
      promises.push(simplyDataApi.saveImportPart(component.id, name, component.parts[name]));
    } else {
      editor.pageData.parts.forEach(function(part) {
        if (part.id == name) {
          promises.push(simplyDataApi.deleteImportPart(component.id, name));
        }
      });
    }
  };
  
  if (
    (typeof component.parts !== "undefined") &&
    (typeof component.parts.importUrls !== "undefined") &&
    Array.isArray(component.parts.importUrls)
  ) {
    component.parts.importUrls.forEach(function(importUrl) {
      let modulePath = "simply-modules/" + component.id + "/" + importUrl.import + "/";
      promises.push(simplyApp.actions.fetchImport(importUrl.url, modulePath));
    });
  }

  var meta = clone(component);
  delete meta.parts;
  promises.push(simplyDataApi.saveImportPart(meta.id, "meta", meta));

  return Promise.all(promises)
    .then(function() {
    return true;
  });
}