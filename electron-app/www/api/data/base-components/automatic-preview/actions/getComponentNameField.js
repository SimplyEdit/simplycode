function(component) { 
  /*
  var nameOptions = [
    'name', // routes, componentCss, pageCss, headHtml, bodyHtml, footHtml
    'component', // componentTemplates
    'action', // actions
    'command', // commands
    'page', // pageTemplates
    'method', // rawApi, dataApi
    'dataSource', // dataSources
    'transformer', // transformers
    'sorter' // sorters
  ];
  */
  switch (component) {
    case "componentTemplates":
      return 'component';
    case 'actions':
      return 'action';
    case 'commands':
      return 'command';
    case 'pageTemplates':
      return 'page';
    case 'rawApi':
    case 'dataApi':
      return 'method';
    case 'dataSources':
      return 'dataSource';
    case 'transformers':
      return 'transformer';
    case 'sorters':
      return 'sorter';
    default:
      return 'name';
  }
}