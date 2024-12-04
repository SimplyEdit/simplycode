function(component) {
  return simplyRawApi.get("components/" + component)
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