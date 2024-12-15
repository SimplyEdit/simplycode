function(component, part, contents) {
  return simplyDataApi.savePart(simplyRawApi.projectUrl + "pages/" + component, part, contents)
    .then(function(response) {
    if (response.ok) {
      return true;
    }
    // retry the call once
    return simplyDataApi.savePart(simplyRawApi.projectUrl + "pages/" + component, part, contents)
      .then(function(response) {
      if (response.ok) {
        return true;
      }
      throw new Error("savePagePart failed", response.status);
    });
  });
}