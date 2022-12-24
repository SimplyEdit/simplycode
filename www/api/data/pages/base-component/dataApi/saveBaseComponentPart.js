function(component, part, contents) {
  simplyDataApi.deletePart("base-components/" + component, part) // FIXME: this allows the old structure to be updated. should be removed when no longer needed.
    .then(function() {
    return simplyDataApi.savePart("base-components/" + component, part, contents);
  })
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("saveBaseComponentPart failed", response.status);
  });
}