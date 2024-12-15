function(component, part) {
 return simplyRawApi.delete(simplyRawApi.projectUrl + "pages/" + component + "/" + part)
    .then(function(response) {
    if (response.ok) {
      return true;
    }
    throw new Error("deletePagePart failed", response.status);
  });
}