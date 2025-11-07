function() {
  return simplyRawApi.get("components")
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("listComponents failed", response.status);
  })
    .then(function(components) {
    components.forEach(function(component) {
      simplyDataApi.mergeComponent(component.contents);
      component.description = component.contents.description;
      component.baseType = 'component';
    });
    return components;
  });
}