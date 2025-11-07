function() {
  return simplyRawApi.get("builders")
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("listBuilders failed", response.status);
  })
    .then(function(components) {
    components.forEach(function(component) {
      simplyDataApi.mergeComponent(component.contents);
      component.baseType = 'builder';
      component.description = component.contents.description;
    });
    return components;
  });
}