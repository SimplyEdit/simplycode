function(basePath, part, contents) {
  var results = [];

  switch (part) {
    case "meta":
      return simplyRawApi.putRaw(basePath + "/meta.json", {}, JSON.stringify(contents));
      break;
    case "routes":
      contents.forEach(function(componentPart, componentIndex) {
        if (!componentPart.name) {
          throw new Error("Required part name is empty");
        }
        if (componentPart.deleted == "true") {
          results.push(simplyRawApi.delete(basePath + "/" + part + "/" + componentPart.name + ".json"));
          results.push(simplyRawApi.delete(basePath + "/" + part + "/" + componentPart.name + ".js"));
          contents.splice(componentIndex, 1);
        } else { 
          results.push(simplyRawApi.putRaw(
            basePath + "/" + part + "/" + componentPart.name + ".json", {},
            JSON.stringify(componentPart.route)
          ));
          results.push(simplyRawApi.putRaw(
            basePath + "/" + part + "/" + componentPart.name + ".js", {},
            componentPart.code
          ));
        }
      });
      break;
    case "componentCss":
    case "pageCss":
      contents.forEach(function(componentPart, componentIndex) {
        if (!componentPart.name) {
          throw new Error("Required part name is empty");
        }
        if (componentPart.deleted == "true") {
          results.push(simplyRawApi.delete(basePath + "/" + part + "/" + componentPart.name + ".css"));
          contents.splice(componentIndex, 1);
        } else { 
          results.push(simplyRawApi.putRaw(
            basePath + "/" + part + "/" + componentPart.name + ".css", {},
            componentPart.code
          ));
        }
      });
      break;
    case "componentTemplates":
      contents.forEach(function(componentPart, componentIndex) {
        if (!componentPart.component) {
          throw new Error("Required part name is empty");
        }
        if (componentPart.deleted == "true") {
          results.push(simplyRawApi.delete(basePath + "/" + part + "/" + componentPart.component + ".html"));
          if (componentPart.sampledata) {
            results.push(simplyRawApi.delete(basePath + "/" + part + "/" + componentPart.component + ".json"));
          }
          contents.splice(componentIndex, 1);
        } else { 
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
        }
      });
      break;
    case "pageTemplates":
      contents.forEach(function(componentPart, componentIndex) {
        if (!componentPart.page) {
          throw new Error("Required part name is empty");
        }
        if (componentPart.deleted == "true") {
          results.push(simplyRawApi.delete(basePath + "/" + part + "/" + componentPart.page + ".html"));
          if (componentPart.sampledata) {
            results.push(simplyRawApi.delete(basePath + "/" + part + "/" + componentPart.page + ".json"));
          }
          contents.splice(componentIndex, 1);
        } else {
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
        }
      });
      break;
    case "builderTemplates":
      contents.forEach(function(componentPart, componentIndex) {
        if (!componentPart.builder) {
          throw new Error("Required part name is empty");
        }
        if (componentPart.deleted == "true") {
          results.push(simplyRawApi.delete(basePath + "/" + part + "/" + componentPart.builder + ".html"));
          contents.splice(componentIndex, 1);
        } else {
          results.push(simplyRawApi.putRaw(
            basePath + "/" + part + "/" + componentPart.builder, {},
            componentPart.code
          ));
        }
      });
      break;
    case "rawApi":
    case "dataApi":
      contents.forEach(function(componentPart, componentIndex) {
        if (!componentPart.method) {
          throw new Error("Required part name is empty");
        }
        if (componentPart.deleted == "true") {
          results.push(simplyRawApi.delete(basePath + "/" + part + "/" + componentPart.method + ".js"));
          contents.splice(componentIndex, 1);
        } else {
          results.push(simplyRawApi.putRaw(
            basePath + "/" + part + "/" + componentPart.method + ".js", {},
            componentPart.code
          ));
        }
      });
      break;
    case "actions":
      contents.forEach(function(componentPart, componentIndex) {
        if (!componentPart.action) {
          throw new Error("Required part name is empty");
        }
        if (componentPart.deleted == "true") {
          results.push(simplyRawApi.delete(basePath + "/" + part + "/" + componentPart.action + ".js"));
          if (componentPart.tests && componentPart.tests.length) {
            results.push(simplyRawApi.delete(basePath + "/" + part + "/" + componentPart.action + "/"));
          }
          contents.splice(componentIndex, 1);
        } else {
          results.push(simplyRawApi.putRaw(
            basePath + "/" + part + "/" + componentPart.action + ".js", {},
            componentPart.code
          ));
          if (componentPart.tests) {
            componentPart.tests.forEach(function(test, testIndex) {
              if (!test.name) {
                throw new Error("Required test name is empty");
              }
              if (test.deleted == "true") {
                results.push(simplyRawApi.delete(basePath + "/" + part + "/tests/" + componentPart.action + "/" + test.name + ".js"));
                componentPart.tests.splice(testIndex, 1);
              } else {
                results.push(simplyRawApi.putRaw(
                  basePath + "/" + part + "/tests/" + componentPart.action + "/" + test.name + ".js", {},
                  test['test-code']
                ));
              }
            });
          }
        }
      });
      break;
    case "commands":
      contents.forEach(function(componentPart, componentIndex) {
        if (!componentPart.command) {
          throw new Error("Required part name is empty");
        }
        if (componentPart.deleted == "true") {
          results.push(simplyRawApi.delete(basePath + "/" + part + "/" + componentPart.command + ".js"));
          if (componentPart.tests && componentPart.tests.length) {
            results.push(simplyRawApi.delete(basePath + "/" + part + "/" + componentPart.command + "/"));
          }
          contents.splice(componentIndex, 1);
        } else {
          results.push(simplyRawApi.putRaw(
            basePath + "/" + part + "/" + componentPart.command + ".js", {},
            componentPart.code
          ));
          if (componentPart.tests) {
            componentPart.tests.forEach(function(test, testIndex) {
              if (!test.name) {
                throw new Error("Required test name is empty");
              }
              if (test.deleted == "true") {
                results.push(simplyRawApi.delete(basePath + "/" + part + "/tests/" + componentPart.command + "/" + test.name + ".js"));
                componentPart.tests.splice(testIndex, 1);
              } else {
                results.push(simplyRawApi.putRaw(
                  basePath + "/" + part + "/tests/" + componentPart.command + "/" + test.name + ".js", {},
                  test['test-code']
                ));
              }
            });
          }
        }
      });
      break;
    case "shortcuts":
      contents.forEach(function(componentPart, componentIndex) {
        if (!componentPart.shortcut) {
          throw new Error("Required part name is empty");
        }
        if (componentPart.deleted == "true") {
          results.push(simplyRawApi.delete(basePath + "/" + part + "/" + componentPart.shortcut + ".js"));
          if (componentPart.tests && componentPart.tests.length) {
            results.push(simplyRawApi.delete(basePath + "/" + part + "/" + componentPart.shortcut + "/"));
          }
          contents.splice(componentIndex, 1);
        } else {
          results.push(simplyRawApi.putRaw(
            basePath + "/" + part + "/" + componentPart.shortcut + ".js", {},
            componentPart.code
          ));
          if (componentPart.tests) {
            componentPart.tests.forEach(function(test, testIndex) {
              if (!test.name) {
                throw new Error("Required test name is empty");
              }
              if (test.deleted == "true") {
                results.push(simplyRawApi.delete(basePath + "/" + part + "/tests/" + componentPart.shortcut + "/" + test.name + ".js"));
                componentPart.tests.splice(testIndex, 1);
              } else {
                results.push(simplyRawApi.putRaw(
                  basePath + "/" + part + "/tests/" + componentPart.shortcut + "/" + test.name + ".js", {},
                  test['test-code']
                ));
              }
            });
          }
        }
      });
      break;
    case "dataSources":
      contents.forEach(function(componentPart, componentIndex) {
        if (!componentPart.dataSource) {
          throw new Error("Required part name is empty");
        }
        if (componentPart.deleted == "true") {
          results.push(simplyRawApi.delete(basePath + "/" + part + "/" + componentPart.dataSource + "-get.js"));
          results.push(simplyRawApi.delete(basePath + "/" + part + "/" + componentPart.dataSource + "-set.js"));
          results.push(simplyRawApi.delete(basePath + "/" + part + "/" + componentPart.dataSource + "-load.js"));
          results.push(simplyRawApi.delete(basePath + "/" + part + "/" + componentPart.dataSource + "-save.js"));
          if (componentPart.tests && componentPart.tests.length) {
            results.push(simplyRawApi.delete(basePath + "/" + part + "/" + componentPart.dataSource + "/"));
          }
          contents.splice(componentIndex, 1);
        } else {
          if (componentPart['get-code']) {
            results.push(simplyRawApi.putRaw(
              basePath + "/" + part + "/" + componentPart.dataSource + "-get.js", {},
              componentPart['get-code']
            ));
          }
          if (componentPart['set-code']) {
            results.push(simplyRawApi.putRaw(
              basePath + "/" + part + "/" + componentPart.dataSource + "-set.js", {},
              componentPart['set-code']
            ));
          }
          if (componentPart['load-code']) {
            results.push(simplyRawApi.putRaw(
              basePath + "/" + part + "/" + componentPart.dataSource + "-load.js", {},
              componentPart['load-code']
            ));
          }
          if (componentPart['save-code']) {
            results.push(simplyRawApi.putRaw(
              basePath + "/" + part + "/" + componentPart.dataSource + "-save.js", {},
              componentPart['save-code']
            ));
          }
          if (componentPart.tests) {
            componentPart.tests.forEach(function(test, testIndex) {
              if (!test.name) {
                throw new Error("Required test name is empty");
              }
              if (test.deleted == "true") {
                results.push(simplyRawApi.delete(basePath + "/" + part + "/tests/" + componentPart.dataSource + "/" + test.name + ".js"));
                componentPart.tests.splice(testIndex, 1);
              } else {
                results.push(simplyRawApi.putRaw(
                  basePath + "/" + part + "/tests/" + componentPart.dataSource + "/" + test.name + ".js", {},
                  test['test-code']
                ));
              }
            });
          }
        }
      });
      break;
    case "transformers":
      contents.forEach(function(componentPart, componentIndex) {
        if (!componentPart.transformer) {
          throw new Error("Required part name is empty");
        }
        if (componentPart.deleted == "true") {
          results.push(simplyRawApi.delete(basePath + "/" + part + "/" + componentPart.transformer + "-render.js"));
          results.push(simplyRawApi.delete(basePath + "/" + part + "/" + componentPart.transformer + "-extract.js"));
          if (componentPart.tests && componentPart.tests.length) {
            results.push(simplyRawApi.delete(basePath + "/" + part + "/" + componentPart.transformer + "/"));
          }
          contents.splice(componentIndex, 1);
        } else {
          if (componentPart['render-code']) {
            results.push(simplyRawApi.putRaw(
              basePath + "/" + part + "/" + componentPart.transformer + "-render.js", {},
              componentPart['render-code']
            ));
          }
          if (componentPart['extract-code']) {
            results.push(simplyRawApi.putRaw(
              basePath + "/" + part + "/" + componentPart.transformer + "-extract.js", {},
              componentPart['extract-code']
            ));
          }
          if (componentPart.tests) {
            componentPart.tests.forEach(function(test, testIndex) {
              if (!test.name) {
                throw new Error("Required test name is empty");
              }
              if (test.deleted == "true") {
                results.push(simplyRawApi.delete(basePath + "/" + part + "/tests/" + componentPart.transformer + "/" + test.name + ".js"));
                componentPart.tests.splice(testIndex, 1);
              } else {
                results.push(simplyRawApi.putRaw(
                  basePath + "/" + part + "/tests/" + componentPart.transformer + "/" + test.name + ".js", {},
                  test['test-code']
                ));
              }
            });
          }
        }
      });
      break;
    case "sorters":
      contents.forEach(function(componentPart, componentIndex) {
        if (!componentPart.sorter) {
          throw new Error("Required part name is empty");
        }
        if (componentPart.deleted == "true") {
          results.push(simplyRawApi.delete(basePath + "/" + part + "/" + componentPart.sorter + ".js"));
          contents.splice(componentIndex, 1);
        } else {
          results.push(simplyRawApi.putRaw(
            basePath + "/" + part + "/" + componentPart.sorter + ".js", {},
            componentPart.code
          ));
        }
      });
      break;
    case "headHtml":
    case "bodyHtml":
    case "footHtml":
      contents.forEach(function(componentPart, componentIndex) {
        if (!componentPart.name) {
          throw new Error("Required part name is empty");
        }
        if (componentPart.deleted == "true") {
          results.push(simplyRawApi.delete(basePath + "/" + part + "/" + componentPart.name + ".html"));
          contents.splice(componentIndex, 1);
        } else {
          results.push(simplyRawApi.putRaw(
            basePath + "/" + part + "/" + componentPart.name + ".html", {},
            componentPart.code
          ));
        }
      });
      break;
    case "fullApp":
    case "componentPreview":
    case "pagePreview":
      results.push(simplyRawApi.putRaw(basePath + "/" + part + ".html", {}, contents));
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