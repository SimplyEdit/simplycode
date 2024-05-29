function(data) {
  this.originalData = data;
  methods = [];
  data.forEach(function(method) {
    methods.push('"' + method.route + '" : ' + method.code);
  });
  return methods.join(",\n");
}