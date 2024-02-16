function(component, part, contents) {
  return simplyDataApi.savePart("pages/" + component, part, contents)
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    // retry the call once
    return simplyDataApi.savePart("pages/" + component, part, contents)
      .then(function(response) {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error("savePagePart failed", response.status);
    });
  });
}