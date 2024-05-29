function() {
  return simplyRawApi.get("base-components")
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("listBaseComponents failed", response.status);
  })
    .then(function(components) {
    components.forEach(function(component) {
      simplyDataApi.mergeComponent(component.contents);
    });
    return components;
  });
}