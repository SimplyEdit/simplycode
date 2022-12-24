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
    }
  });
  return component;
}