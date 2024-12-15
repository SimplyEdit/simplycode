function(component, part) {
 return simplyRawApi.delete(simplyRawApi.projectUrl + "builders/" + component + "/" + part)
    .then(function(response) {
    if (response.ok) {
      return true;
    }
    throw new Error("deleteBuilderPart failed", response.status);
  });
}