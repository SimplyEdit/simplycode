function(component) {
  // this function morphs the component parts for seperate files back into one structure.
  component.forEach(function(componentPart) {
    switch(componentPart.id) {
      case "meta.json":
        componentPart.id = "meta";
        break;
      case "routes":
        if (typeof componentPart.contents === "object") {
          var contents = {};
          componentPart.contents.forEach(function(partFile) {
            if (partFile.id.match(/\.json$/)) {
              partId = partFile.id.replace(/\.json$/, '');
              if (typeof contents[partId] === "undefined") {
                contents[partId] = {
                  name : partId
                }
              }
              contents[partId]['route'] = JSON.parse(partFile.contents);
            }
            if (partFile.id.match(/\.js$/)) {
              partId = partFile.id.replace(/\.js$/, '');
              if (typeof contents[partId] === "undefined") {
                contents[partId] = {
                  name : partId
                }
              }
              contents[partId]['code'] = partFile.contents;
            }
          });
          componentPart.contents = JSON.stringify(Object.values(contents));
        }
        break;
      case "componentCss":
      case "pageCss":
        if (typeof componentPart.contents === "object") {
          var contents = {};
          componentPart.contents.forEach(function(partFile) {
            if (partFile.id.match(/\.css$/)) {
              partId = partFile.id.replace(/\.css$/, '');
              if (typeof contents[partId] === "undefined") {
                contents[partId] = {
                  name : partId
                }
              }
              contents[partId]['code'] = partFile.contents;
            }
          });
          componentPart.contents = JSON.stringify(Object.values(contents));
        }
        break;
      case "componentTemplates":
        if (typeof componentPart.contents === "object") {
          var contents = {};
          componentPart.contents.forEach(function(partFile) {
            if (partFile.id.match(/\.html$/)) {
              partId = partFile.id.replace(/\.html$/, '');
              if (typeof contents[partId] === "undefined") {
                contents[partId] = {
                  component : partId
                }
              }
              contents[partId]['code'] = partFile.contents;
            }
            if (partFile.id.match(/\.json$/)) {
              partId = partFile.id.replace(/\.json$/, '');
              if (typeof contents[partId] === "undefined") {
                contents[partId] = {
                  component : partId
                }
              }
              contents[partId]['sampledata'] = partFile.contents;
            }
          });
          componentPart.contents = JSON.stringify(Object.values(contents));
        }
        break;
      case "pageTemplates":
        if (typeof componentPart.contents === "object") {
          var contents = {};
          componentPart.contents.forEach(function(partFile) {
            if (partFile.id.match(/\.html$/)) {
              partId = partFile.id.replace(/\.html$/, '');
              if (typeof contents[partId] === "undefined") {
                contents[partId] = {
                  page : partId
                }
              }
              contents[partId]['code'] = partFile.contents;
            }
            if (partFile.id.match(/\.json$/)) {
              partId = partFile.id.replace(/\.json$/, '');
              if (typeof contents[partId] === "undefined") {
                contents[partId] = {
                  page : partId
                }
              }
              contents[partId]['sampledata'] = partFile.contents;
            }
          });
          componentPart.contents = JSON.stringify(Object.values(contents));
        }
        break;
      case "rawApi":
      case "dataApi":
        if (typeof componentPart.contents === "object") {
          var contents = {};
          componentPart.contents.forEach(function(partFile) {
            if (partFile.id.match(/\.js$/)) {
              partId = partFile.id.replace(/\.js$/, '');
              if (typeof contents[partId] === "undefined") {
                contents[partId] = {
                  method : partId
                }
              }
              contents[partId]['code'] = partFile.contents;
            }
          });
          componentPart.contents = JSON.stringify(Object.values(contents));
        }
        break;
      case "actions":
        if (typeof componentPart.contents === "object") {
          var contents = {};
          componentPart.contents.forEach(function(partFile) {
            if (partFile.id.match(/\.js$/)) {
              partId = partFile.id.replace(/\.js$/, '');
              if (typeof contents[partId] === "undefined") {
                contents[partId] = {
                  action : partId
                }
              }
              contents[partId]['code'] = partFile.contents;
            }
            if (partFile.id.match(/^tests$/)) {
              tests = {};
              partFile.contents.forEach(function(testSet) {
                testSetPartId = testSet.id;
                if (typeof contents[testSetPartId] === "undefined") {
                  contents[testSetPartId] = {
                    action : testSetPartId
                  }
                }
                testSet.contents.forEach(function(test) {
                  if (typeof tests[testSet.id] === "undefined") {
                    tests[testSet.id] = [];
                  }
                  tests[testSet.id].push({
                    name : test.id.replace(/\.js$/, ''),
                    "test-code" : test.contents
                  });
                });
                contents[testSet.id]['tests'] = Object.values(tests[testSet.id]);
              });
            }
          });
          componentPart.contents = JSON.stringify(Object.values(contents));
        }
        break;
      case "commands":
        if (typeof componentPart.contents === "object") {
          var contents = {};
          componentPart.contents.forEach(function(partFile) {
            if (partFile.id.match(/\.js$/)) {
              partId = partFile.id.replace(/\.js$/, '');
              if (typeof contents[partId] === "undefined") {
                contents[partId] = {
                  command : partId
                }
              }
              contents[partId]['code'] = partFile.contents;
            }
            if (partFile.id.match(/^tests$/)) {
              tests = {};
              partFile.contents.forEach(function(testSet) {
                testSetPartId = testSet.id;
                if (typeof contents[testSetPartId] === "undefined") {
                  contents[testSetPartId] = {
                    command : testSetPartId
                  }
                }
                testSet.contents.forEach(function(test) {
                  if (typeof tests[testSet.id] === "undefined") {
                    tests[testSet.id] = [];
                  }
                  tests[testSet.id].push({
                    name : test.id.replace(/\.js$/, ''),
                    "test-code" : test.contents
                  });
                });
                contents[testSet.id]['tests'] = Object.values(tests[testSet.id]);
              });
            }
          });
          componentPart.contents = JSON.stringify(Object.values(contents));
        }
        break;
      case "dataSources":
        if (typeof componentPart.contents === "object") {
          var contents = {};
          componentPart.contents.forEach(function(partFile) {
            if (partFile.id.match(/\-get.js$/)) {
              partId = partFile.id.replace(/\-get.js$/, '');
              if (typeof contents[partId] === "undefined") {
                contents[partId] = {
                  dataSource : partId
                }
              }
              contents[partId]['get-code'] = partFile.contents;
            }
            if (partFile.id.match(/\-set.js$/)) {
              partId = partFile.id.replace(/\-set.js$/, '');
              if (typeof contents[partId] === "undefined") {
                contents[partId] = {
                  dataSource : partId
                }
              }
              contents[partId]['set-code'] = partFile.contents;
            }
            if (partFile.id.match(/\-load.js$/)) {
              partId = partFile.id.replace(/\-load.js$/, '');
              if (typeof contents[partId] === "undefined") {
                contents[partId] = {
                  dataSource : partId
                }
              }
              contents[partId]['load-code'] = partFile.contents;
            }
            if (partFile.id.match(/\-save.js$/)) {
              partId = partFile.id.replace(/\-save.js$/, '');
              if (typeof contents[partId] === "undefined") {
                contents[partId] = {
                  dataSource : partId
                }
              }
              contents[partId]['save-code'] = partFile.contents;
            }
            if (partFile.id.match(/^tests$/)) {
              tests = {};
              partFile.contents.forEach(function(testSet) {
                testSetPartId = testSet.id;
                if (typeof contents[testSetPartId] === "undefined") {
                  contents[testSetPartId] = {
                    dataSource : testSetPartId
                  }
                }
                testSet.contents.forEach(function(test) {
                  if (typeof tests[testSet.id] === "undefined") {
                    tests[testSet.id] = [];
                  }
                  tests[testSet.id].push({
                    name : test.id.replace(/\.js$/, ''),
                    "test-code" : test.contents
                  });
                });
                contents[testSet.id]['tests'] = Object.values(tests[testSet.id]);
              });
            }
          });
          componentPart.contents = JSON.stringify(Object.values(contents));
        }
        break;
      case "transformers":
        if (typeof componentPart.contents === "object") {
          var contents = {};
          componentPart.contents.forEach(function(partFile) {
            if (partFile.id.match(/\-render.js$/)) {
              partId = partFile.id.replace(/\-render.js$/, '');
              if (typeof contents[partId] === "undefined") {
                contents[partId] = {
                  transformer : partId
                }
              }
              contents[partId]['render-code'] = partFile.contents;
            }
            if (partFile.id.match(/\-extract.js$/)) {
              partId = partFile.id.replace(/\-extract.js$/, '');
              if (typeof contents[partId] === "undefined") {
                contents[partId] = {
                  transformer : partId
                }
              }
              contents[partId]['extract-code'] = partFile.contents;
            }
            if (partFile.id.match(/^tests$/)) {
              tests = {};
              partFile.contents.forEach(function(testSet) {
                testSetPartId = testSet.id;
                if (typeof contents[testSetPartId] === "undefined") {
                  contents[testSetPartId] = {
                    transformer : testSetPartId
                  }
                }
                testSet.contents.forEach(function(test) {
                  if (typeof tests[testSet.id] === "undefined") {
                    tests[testSet.id] = [];
                  }
                  tests[testSet.id].push({
                    name : test.id.replace(/\.js$/, ''),
                    "test-code" : test.contents
                  });
                });
                contents[testSet.id]['tests'] = Object.values(tests[testSet.id]);
              });
            }
          });
          componentPart.contents = JSON.stringify(Object.values(contents));
        }
        break;
      case "sorters":
        if (typeof componentPart.contents === "object") {
          var contents = {};
          componentPart.contents.forEach(function(partFile) {
            if (partFile.id.match(/\.js$/)) {
              partId = partFile.id.replace(/\.js$/, '');
              if (typeof contents[partId] === "undefined") {
                contents[partId] = {
                  sorter : partId
                }
              }
              contents[partId]['code'] = partFile.contents;
            }
          });
          componentPart.contents = JSON.stringify(Object.values(contents));
        }
        break;
      case "headHtml":
      case "bodyHtml":
      case "footHtml":
        if (typeof componentPart.contents === "object") {
          var contents = {};
          componentPart.contents.forEach(function(partFile) {
            if (partFile.id.match(/\.html$/)) {
              partId = partFile.id.replace(/\.html$/, '');
              if (typeof contents[partId] === "undefined") {
                contents[partId] = {
                  name : partId
                }
              }
              contents[partId]['code'] = partFile.contents;
            }
          });
          componentPart.contents = JSON.stringify(Object.values(contents));
        }
        break;
    }
  });
  return component;
}