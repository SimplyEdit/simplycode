function(data) {
  this.originalData = data;
  
  var componentPreview = editor.pageData.app.pageFrame.componentPreview;
  let replacements = {
    "componentPreview" : data,
    "actions" : editor.transformers.simplyPreviewActions.render(editor.pageData.app.actions ?? []),
    "commands" : editor.transformers.simplyPreviewCommands.render(editor.pageData.app.commands ?? []),
    "dataApi" : editor.transformers.simplyPreviewDataApi.render(editor.pageData.app.dataApi ?? []),
    "rawApi" : editor.transformers.simplyPreviewRawApi.render(editor.pageData.app.rawApi ?? []),
    "routes" : editor.transformers.simplyPreviewRoutes.render(editor.pageData.app.routes ?? []),
    "dataSources" : editor.transformers.simplyPreviewDataSources.render(editor.pageData.app.dataSources ?? []),
    "transformers" : editor.transformers.simplyPreviewTransformers.render(editor.pageData.app.transformers ?? []),
    "sorters" : editor.transformers.simplyPreviewSorters.render(editor.pageData.app.sorters ?? []),
    "pageTemplates" :editor.transformers.simplyPreviewPageTemplates.render(editor.pageData.app.pageTemplates ?? []),
    "pageCss" : editor.transformers.simplyPreviewPageCss.render(editor.pageData.app.pageCss ?? []),
    "componentCss" : editor.transformers.simplyPreviewComponentCss.render(editor.pageData.app.componentCss ?? []),
    "componentTemplates" : editor.transformers.simplyPreviewComponentTemplates.render(editor.pageData.app.componentTemplates ?? []),
    "headHtml": editor.transformers.simplyPreviewHeadHtml.render(editor.pageData.app.headHtml ?? []),
    "footHtml": editor.transformers.simplyPreviewFootHtml.render(editor.pageData.app.footHtml ?? []),
    "bodyHtml" : editor.transformers.simplyPreviewBodyHtml.render(editor.pageData.app.bodyHtml ?? [])
  };

  // replace keys with the indentation as given
  Object.keys(replacements).forEach(function(replacement) {
    matches = componentPreview.match("(\\s+){" + replacement + "}");
    if (matches) {
      componentPreview = componentPreview.replace("{" + replacement + "}", replacements[replacement].replace(/\n/g, matches[1]));
    }
  });

  // escape html
  var dataDiv = document.createElement("div");
  dataDiv.appendChild(document.createTextNode(componentPreview));
  return dataDiv.innerHTML;
}