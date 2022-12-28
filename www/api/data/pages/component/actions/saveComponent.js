function(component) {
  var promises = [];
  for (var name in component.parts) {
    if (component.parts[name].length) { 
      promises.push(simplyDataApi.saveComponentPart(component.id, name, JSON.stringify(component.parts[name])));
    } else {
      editor.pageData.parts.forEach(function(part) {
        if (part.id == name) {
          promises.push(simplyDataApi.deleteComponentPart(component.id, name));
        }
      });
    }
  };

  var meta = clone(component);
  delete meta.parts;
  promises.push(simplyDataApi.saveComponentPart(meta.id, "meta", JSON.stringify(meta)));

  return Promise.all(promises)
    .then(function() {
    return true;
  });
}