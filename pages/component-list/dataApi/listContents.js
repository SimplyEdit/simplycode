function(subject) {
  return simplyDataApi.listDirectories(subject)
    .then(function(componentTypes) {
    if (componentTypes.length === 0) {
      return [];
    }
    let promises = [];
    componentTypes.forEach(function(componentType) {
      promises.push(
        simplyDataApi.listFiles(componentType)
        .then(function(componentParts) {
          if (componentParts.length === 0) {
            return [];
          }
          let partPromises = [];
          componentParts.forEach(function(componentPart) { // 
            partPromises.push(
              simplyRawApi.get(componentPart)
              .then(function(response) {
                if (response.status === 200) {
                  return response.text()
                }
              })
              .then(function(contents) {
                return {
                  "id" : componentPart.replace(componentType, ''),
                  "contents" : contents
                }                
              })
            );
          });
          return Promise.all(partPromises);
        })
        .then(function(partContents) {
          return {
            "id" : componentType.replace(subject, '').replace(/\/$/, ''),
            "contents" : partContents
          }
        })
      );
    });
    return Promise.all(promises);
  })
}