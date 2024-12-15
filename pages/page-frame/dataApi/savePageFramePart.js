function(part, contents) {
  if (part == "meta") {
    return '"ok"';
  }
  return simplyDataApi.savePart(simplyRawApi.projectUrl + "page-frame", part, contents)
    .then(function(response) {
    if (response.ok) {
      return true;
    }
    // retry the call once
    return simplyDataApi.savePart(simplyRawApi.projectUrl + "page-frame", part, contents)
      .then(function(response) {
      if (response.ok) {
        return true;
      }
      throw new Error("savePageFramePart failed", response.status);
    });
  });
}