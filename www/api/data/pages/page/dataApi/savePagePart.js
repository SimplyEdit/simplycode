function(component, part, contents) {
  simplyDataApi.deletePart("pages/" + component, part) // FIXME: this allows the old structure to be updated. should be removed when no longer needed.
    .then(function() {
    return simplyDataApi.savePart("pages/" + component, part, contents);
  })
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