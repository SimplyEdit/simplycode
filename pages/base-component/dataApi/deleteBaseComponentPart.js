function(component, part) {
 return simplyRawApi.delete(simplyRawApi.projectUrl + "base-components/" + component + "/" + part)
    .then(function(response) {
    if (response.ok) {
      return true;
    }
    throw new Error("deleteBaseComponentPart failed", response.status);
  });
}