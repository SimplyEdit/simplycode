function(component) {
  var promises = [];
  for (var name in component.parts) {
    if (component.parts[name].length) {
      promises.push(simplyDataApi.savePageFramePart(name, component.parts[name]));
    }
  };

  var meta = clone(component);
  delete meta.parts;
  promises.push(simplyDataApi.savePageFramePart("meta", meta));

  return Promise.all(promises)
    .then(function() {
    return true;
  });
}