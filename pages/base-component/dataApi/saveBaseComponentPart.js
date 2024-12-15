function(component, part, contents) {
  return simplyDataApi.savePart(simplyRawApi.projectUrl + "base-components/" + component, part, contents)
    .then(function(response) {
    if (response.ok) {
      return true;
    }
    // retry the call once
    return simplyDataApi.savePart(simplyRawApi.projectUrl + "base-components/" + component, part, contents)
      .then(function(response) {
      if (response.ok) {
        return true;
      }
      throw new Error("saveBaseComponentPart failed", response.status);
    });
  });
}