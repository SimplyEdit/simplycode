function(el) {
  if (!el.hasAttribute("open")) {
    return simplyApp.commands.expandMenu(el);
  }
  el.removeAttribute("open");
  el.querySelector("ul").dataBinding.set([]);
}