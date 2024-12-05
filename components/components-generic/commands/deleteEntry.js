function(el) {
  if (!confirm("Delete this?")) {
    return;
  }
  el.dataBinding.config.data.deleted = "true";
}