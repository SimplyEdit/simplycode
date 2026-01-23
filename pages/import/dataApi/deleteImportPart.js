function(component, part) {
  return simplyRawApi.delete("imports/" + component + "/" + part)
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("deleteImportPart failed", response.status);
  });
}