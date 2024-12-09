function(component, part) {
  return simplyRawApi.delete("builders/" + component + "/" + part)
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("deleteBuilderPart failed", response.status);
  });
}