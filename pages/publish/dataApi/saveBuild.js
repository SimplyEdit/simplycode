function(target, contents) {
  return simplyRawApi.putRaw(target, {}, contents)
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("saveBuild failed", response.status);
  });
}