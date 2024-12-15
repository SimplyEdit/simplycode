function(target, contents) {
  return simplyRawApi.putRaw(target, {}, contents)
    .then(function(response) {
    if (response.ok) {
      return true;
    }
    throw new Error("saveBuild failed", response.status);
  });
}