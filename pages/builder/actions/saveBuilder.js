function(component) {
  var promises = [];
  for (var name in component.parts) {
    if (component.parts[name].length) { 
      promises.push(simplyDataApi.saveBuilderPart(component.id, name, component.parts[name]));
    } else {
      editor.pageData.parts.forEach(function(part) {
        if (part.id == name) {
          promises.push(simplyDataApi.deleteBuilderPart(component.id, name));
        }
      });
    }
  };

  var meta = clone(component);
  delete meta.parts;
  promises.push(simplyDataApi.saveBuilderPart(meta.id, "meta", meta));

  return Promise.all(promises)
    .then(function() {
    return true;
  });
}