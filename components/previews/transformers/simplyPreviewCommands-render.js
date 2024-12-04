function(data) {
  this.originalData = data;
  methods = [];
  data.forEach(function(method) {
    methods.push('"' + method.command + '" : ' + method.code);
  });
  return methods.join(",\n");
}