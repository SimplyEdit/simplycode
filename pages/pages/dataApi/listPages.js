function() {
  return simplyRawApi.get("pages")
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("listPages failed", response.status);
  })
    .then(function(components) {
    components.forEach(function(component) {
      simplyDataApi.mergeComponent(component.contents);
      component.baseType = 'page';
      component.description = component.contents.description;
    });
    return components;
  });
}