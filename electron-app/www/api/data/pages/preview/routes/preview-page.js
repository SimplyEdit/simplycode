function(params) {
  editor.pageData.app = {};
  simplyApp.actions.getAppData()
    .then(function(appData) {
    editor.pageData.app = appData;
  })
    .then(function() {
    return simplyApp.actions.getPage(params.page);
  })
    .then(function(parts) {
    var result;
    parts.forEach(function(part) {
      if (part.id == params.partType) {
        partContent = JSON.parse(part.contents);
		switch (part.id) {
          case "pageTemplates":
            partContent.forEach(function(pageTemplate) {
              if (pageTemplate.page == decodeURI(params.part)) {
				result = pageTemplate;
              }
            });
          break;
        }
      }
    });
    for (i in result) {
      editor.pageData[i] = result[i];
    }
    editor.pageData.page = "preview-component";
  })
    .then(function() {
    setTimeout(function() { // FIXME: Wait for the CSS to be available;
      simplyApp.commands.autoRunPreviews();
    }, 1000);
  });
}