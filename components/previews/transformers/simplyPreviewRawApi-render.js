function(data) {
  this.originalData = data;
  methods = [];
  data.forEach(function(method) {
    methods.push('"' + method.method + '" : ' + method.code);
  });
  return methods.join(",\n");
}