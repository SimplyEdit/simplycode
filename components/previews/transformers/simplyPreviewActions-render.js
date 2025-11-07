function(data) {
  this.originalData = data;
  methods = [];
  data.forEach(function(method) {
    methods.push('// ' + method.base + "\n" + '"' + method.action + '" : ' + method.code);
  });
  return methods.join(",\n");
}