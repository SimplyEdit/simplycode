function(part, contents) {
  simplyDataApi.deletePart("page-frame/", part) // FIXME: this allows the old structure to be updated. should be removed when no longer needed.
    .then(function() {
    return simplyDataApi.savePart("page-frame/", part, contents);
  })
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("savePageFramePart failed", response.status);
  });
}