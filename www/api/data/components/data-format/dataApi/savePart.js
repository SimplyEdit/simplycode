function(basePath, part, contents) {
  contents = JSON.parse(contents);
  var results = [];

  switch (part) {
    case "meta":
      return simplyRawApi.putRaw(basePath + "/meta.json", {}, JSON.stringify(contents));
      break;
    case "routes":
      contents.forEach(function(componentPart) {
        if (!componentPart.name) {
          throw new Error("Required part name is empty");
        }
        results.push(simplyRawApi.putRaw(
          basePath + "/" + part + "/" + componentPart.name + ".json", {}, 
          JSON.stringify(componentPart.route)
        ));
        results.push(simplyRawApi.putRaw(
          basePath + "/" + part + "/" + componentPart.name + ".js", {}, 
          componentPart.code
        ));
      });
      break;
    case "componentCss":
    case "pageCss":
      contents.forEach(function(componentPart) {
        if (!componentPart.name) {
          throw new Error("Required part name is empty");
        }
        results.push(simplyRawApi.putRaw(
          basePath + "/" + part + "/" + componentPart.name + ".css", {}, 
          componentPart.code
        ));
      });
      break;
    case "componentTemplates":
      contents.forEach(function(componentPart) {
        if (!componentPart.component) {
          throw new Error("Required part name is empty");
        }
        results.push(simplyRawApi.putRaw(
          basePath + "/" + part + "/" + componentPart.component + ".html", {}, 
          componentPart.code
        ));
        if (componentPart.sampledata) {
          results.push(simplyRawApi.putRaw(
            basePath + "/" + part + "/" + componentPart.component + ".json", {}, 
            componentPart.sampledata
          ));
        }
      });
      break;
    case "pageTemplates":
      contents.forEach(function(componentPart) {
        if (!componentPart.page) {
          throw new Error("Required part name is empty");
        }
        results.push(simplyRawApi.putRaw(
          basePath + "/" + part + "/" + componentPart.page + ".html", {}, 
          componentPart.code
        ));
        if (componentPart.sampledata) {
          results.push(simplyRawApi.putRaw(
            basePath + "/" + part + "/" + componentPart.page + ".json", {}, 
            componentPart.sampledata
          ));
        }
      });
      break;
    case "rawApi":
    case "dataApi":
      contents.forEach(function(componentPart) {
        if (!componentPart.method) {
          throw new Error("Required part name is empty");
        }
        results.push(simplyRawApi.putRaw(
          basePath + "/" + part + "/" + componentPart.method + ".js", {}, 
          componentPart.code
        ));
      });
      break;
    default:
      results.push(simplyRawApi.putRaw(basePath + "/" + part, {}, JSON.stringify(contents)));
      break;
  }
  return Promise.all(results)
    .then(function(responses) {
    for (var i=0; i<responses.length; i++) {
      if (responses[i].status !== 200) {
        return responses[i]; // return an error if we have one
      }
    }
    return responses[0];
  });
}