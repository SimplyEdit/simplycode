function(component) {
  return simplyRawApi.delete(simplyRawApi.projectUrl + "pages/" + component + "/")
  .then(function(response) {
    if (response.ok) {
      return true;
    }
    throw new Error("deletePage failed", response.status);
  });
}