function(remote) {
  let original = {
    "url" : simplyRawApi.url,
    "headers" : simplyRawApi.headers
  };
  simplyRawApi.url = remote.url;
  simplyRawApi.headers = {
    "accept" : "application/json"
  };
  let fetchFunctions = {
    "base-component" : simplyDataApi.getBaseComponent,
    "component" : simplyDataApi.getComponent,
    "page" : simplyDataApi.getPage,
    "page-frame" : simplyDataApi.getPageFrame
  };
  
  fetchFunctions[remote.type](remote.component)
  .then(function(parts) {    
    parts.forEach(function(part) {
      if (part.id == "meta") {
        return;
      }
      editor.pageData.component.parts[part.id] = JSON.parse(part.contents);
    });
  })
  .then(function() {
    for (i in original) {
      simplyRawApi[i] = original[i];
    }
  })
  .catch(function() {
   for (i in original) {
      simplyRawApi[i] = original[i];
    }
  });
}