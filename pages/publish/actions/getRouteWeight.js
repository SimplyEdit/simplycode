function(route) {
  var pathicles = route.route.split("/");
  var weight = "";
  pathicles.forEach(function(pathicle) {
    if (pathicle.length === 0) {
      return;
    }
    if (pathicle.match(/^:/)) {
      weight += "0";
    } else {
      weight += "1";
    }
  });
  if (weight == "") {
    weight = -1;
  }
  return parseInt(weight);
}