function(data) {
  this.originalData = data;
  methods = [];
  data.forEach(function(method) {
    methods.push('// ' + method.base + "\n" + '"' + method.shortcut + '" : ' + method.code);
  });
  return methods.join(",\n");
}