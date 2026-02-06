function(component, modulePath="") {
  return simplyRawApi.get(modulePath + "components/" + component)
  .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("getComponent failed", response.status);
  })
  .then(function(component) {
    return simplyDataApi.mergeComponent(component);
  });
}