function(el) {
  if (el.hasAttribute("open")) {
    return simplyApp.commands.collapseMenu(el);
  }
  el.setAttribute("open", "");
  var path = el.querySelector("a").getAttribute("data-path");
  var link =  el.querySelector("a").href;
  simplyApp.actions.browse(path)
    .then(function(components) {
    var menu = [];
    components.forEach(function(component) {
      menu.push(
        {
          item : {
            innerHTML : component.id,
            href : link + "/" + component.id
          }
        }
      );
    });
    el.querySelector("ul").dataBinding.set(menu);
  });
}