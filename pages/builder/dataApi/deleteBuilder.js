function(component) {
  return simplyRawApi.delete(simplyRawApi.projectUrl + "builders/" + component + "/")
  .then(function(response) {
    if (response.ok) {
      return true;
    }
    throw new Error("deleteBuilder failed", response.status);
  });
}