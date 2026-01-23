function() {
  return simplyRawApi.get("imports")
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("listImports failed", response.status);
  })
    .then(function(components) {
    components.forEach(function(component) {
      simplyDataApi.mergeComponent(component.contents);
      component.baseType = 'import';
      component.description = component.contents.description;
    });
    return components;
  });
}