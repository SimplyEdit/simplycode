function() {
  return simplyRawApi.get("page-frame")
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("getPageFrame failed", response.status);
  })
    .then(function(component) {
    return simplyDataApi.mergeComponent(component);
  });
}