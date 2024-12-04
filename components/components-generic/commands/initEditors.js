function(el) {
  if (el.parentNode.hasAttribute("open")) {
    el.parentNode.removeAttribute("open");
  } else {
    el.parentNode.setAttribute("open", "");
  }
  simplyApp.commands.codeMirrorInit();
  simplyApp.commands.autoRunTests();
  simplyApp.commands.autoRunPreviews();
}