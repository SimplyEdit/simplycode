function(component, part) {
 return simplyRawApi.delete(simplyRawApi.projectUrl + "components/" + component + "/" + part)
    .then(function(response) {
    if (response.ok) {
      return true;
    }
    throw new Error("deleteComponentPart failed", response.status);
  });
}