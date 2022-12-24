function(component, part) {
  return simplyRawApi.delete("pages/" + component + "/" + part)
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    //throw new Error("deletePagePart failed", response.status);
    // allowed while data upgrade is needed
  });
}