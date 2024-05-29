function(assert) {
  var route = {
    "route" : "#foo/bar/bla",
    "code" : ""
  };
  var weight = actions.getRouteWeight(route);
  assert.equal(111, weight, "Path with 3 fixed items weighs 111");
}