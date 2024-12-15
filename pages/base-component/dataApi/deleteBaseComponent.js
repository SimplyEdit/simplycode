function(component) {
  return simplyRawApi.delete(simplyRawApi.projectUrl + "base-components/" + component + "/")
  .then(function(response) {
    if (response.ok) {
      return true;
    }
    throw new Error("deleteBaseComponent failed", response.status);
  });
}