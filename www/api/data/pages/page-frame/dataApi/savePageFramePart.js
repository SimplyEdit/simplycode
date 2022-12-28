function(part, contents) {
  if (part == "meta") {
    return '"ok"';
  }
  return simplyDataApi.savePart("page-frame", part + ".html", contents)
    .then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
    // retry the call once
    return simplyDataApi.savePart("page-frame", part + ".html", contents)
      .then(function(response) {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error("savePageFramePart failed", response.status);
    });
  });
}