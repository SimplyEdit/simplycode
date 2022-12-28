function(el) {
  if (!confirm("Delete this?")) {
    return;
  }
  var target = el;
  while (!target.hasAttribute("data-simply-list-item")) {
    target = target.parentNode;
  }
  var parent = target.parentNode;
  target.parentNode.removeChild(target);
}