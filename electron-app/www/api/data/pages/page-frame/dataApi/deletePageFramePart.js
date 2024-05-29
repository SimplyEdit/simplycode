function(part) {
  return simplyRawApi.delete("page-frame/" + part)
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    // throw new Error("deletePageFramePart failed", response.status);
    // allowed while data upgrade is needed
  });
}