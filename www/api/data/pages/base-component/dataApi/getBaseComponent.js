function(component) {
  return simplyRawApi.get("base-components/" + component)
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("getBaseComponent failed", response.status);
  })
    .then(function(component) {
    return simplyDataApi.mergeComponent(component);
  });
}