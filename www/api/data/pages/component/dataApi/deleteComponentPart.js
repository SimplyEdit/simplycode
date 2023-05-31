function(component, part) {
 return simplyRawApi.delete("components/" + component + "/" + part)
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("deleteComponentPart failed", response.status);
  });
}
