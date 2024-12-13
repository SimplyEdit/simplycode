function(component) {
  return simplyRawApi.get("builders/" + component)
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("getBuilder failed", response.status);
  })
    .then(function(component) {
    return simplyDataApi.mergeComponent(component);
  });
}