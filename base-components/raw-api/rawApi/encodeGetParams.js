function(params) {
  if (!params) {
    return "";
  }
  return "?" + new URLSearchParams(params);
}