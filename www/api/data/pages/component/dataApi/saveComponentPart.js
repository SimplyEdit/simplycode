function(component, part, contents) {
  simplyDataApi.deleteComponentPart(component, part) // FIXME: this allows the old structure to be updated. should be removed when no longer needed.
    .then(function() {
    return simplyDataApi.savePart("components/" + component, part, contents);
  })
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("saveComponentPart failed", response.status);
  });
}