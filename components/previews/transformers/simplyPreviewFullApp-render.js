function(data) {
  this.originalData = data;
  if (!data.pageFrame) {
    return;
  }
  if (!data.pageFrame.fullApp) {
    return;
  }
  var fullApp = data.pageFrame.fullApp;
  let replacements = {
    "actions" : editor.transformers.simplyPreviewActions.render(data.actions ?? []),
    "shortcuts" : editor.transformers.simplyPreviewShortcuts.render(data.shortcuts ?? []),
    "commands" : editor.transformers.simplyPreviewCommands.render(data.commands ?? []),
    "dataApi" : editor.transformers.simplyPreviewDataApi.render(data.dataApi ?? []),
    "rawApi" : editor.transformers.simplyPreviewRawApi.render(data.rawApi ?? []),
    "routes" : editor.transformers.simplyPreviewRoutes.render(data.routes ?? []),
    "dataSources" : editor.transformers.simplyPreviewDataSources.render(data.dataSources ?? []),
    "transformers" : editor.transformers.simplyPreviewTransformers.render(data.transformers ?? []),
    "sorters" : editor.transformers.simplyPreviewSorters.render(data.sorters ?? []),
    "pageTemplates" :editor.transformers.simplyPreviewPageTemplates.render(data.pageTemplates ?? []),
    "pageCss" : editor.transformers.simplyPreviewPageCss.render(data.pageCss ?? []),
    "componentCss" : editor.transformers.simplyPreviewComponentCss.render(data.componentCss ?? []),
    "componentTemplates" : editor.transformers.simplyPreviewComponentTemplates.render(data.componentTemplates ?? []),
    "headHtml": editor.transformers.simplyPreviewHeadHtml.render(data.headHtml ?? []),
    "footHtml": editor.transformers.simplyPreviewFootHtml.render(data.footHtml ?? []),
    "bodyHtml" : editor.transformers.simplyPreviewBodyHtml.render(data.bodyHtml ?? [])
  };

  Object.keys(replacements).forEach(function(replacement) {
    matches = fullApp.match("(\\s+){{" + replacement + "}}");
    if (matches) {
      fullApp = fullApp.replace("{{" + replacement + "}}", replacements[replacement].replace(/\n/g, matches[1]));
    }
  });

  // escape html
  var dataDiv = document.createElement("div");
  dataDiv.appendChild(document.createTextNode(fullApp));
  return dataDiv.innerHTML;
}