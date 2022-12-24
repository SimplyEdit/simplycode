function(component, part) {
  return simplyRawApi.delete("base-components/" + component + "/" + part)
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    // throw new Error("deleteBaseComponentPart failed", response.status);
    // allowed while data upgrade is needed
  });
}