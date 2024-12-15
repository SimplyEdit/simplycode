function() {
  return simplyDataApi.listDirectories(simplyRawApi.projectUrl + "pages/")
  .then(function(components) {
    let promises = [];
    components.forEach(function(componentPath) {
	  promises.push(
        simplyRawApi.get(componentPath + "meta.json")
        .then(function(response) {
          if (response.ok) {
            return response.json();
          }
        })
        .then(function(result) {
          return simplyDataApi.listContents(componentPath)
          .then(function(contents) {
            result.contents = contents;
            simplyDataApi.mergeComponent(result.contents);
            return result;
          });
        })
      );
    });    
    return Promise.all(promises);
  });
}