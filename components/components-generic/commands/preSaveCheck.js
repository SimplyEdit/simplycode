function(el) {
  if (document.querySelector(":invalid")) {
    editor.pageData.alerts.unshift({
      "data-simply-template" : "error",
      "message" : "Not all required fields have been filled out.",
      "state" : "new"
    });
    document.querySelectorAll("details:has(:invalid)").forEach(function(item) {
      item.setAttribute("open", true);
    });
    document.querySelector(":invalid:not(form)").focus();
    return false;
  }
  return true;
}