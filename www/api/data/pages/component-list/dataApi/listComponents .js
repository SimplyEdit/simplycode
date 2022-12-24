function() {
  return simplyRawApi.get("components")
  .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("listComponents failed", response.status);
  });
}