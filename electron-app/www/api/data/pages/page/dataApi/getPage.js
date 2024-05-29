function(component) {
  return simplyRawApi.get("pages/" + component)
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("getPage failed", response.status);
  })
    .then(function(component) {
    return simplyDataApi.mergeComponent(component);
  });
}