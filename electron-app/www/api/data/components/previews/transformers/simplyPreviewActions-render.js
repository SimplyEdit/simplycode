function(data) {
  this.originalData = data;
  methods = [];
  data.forEach(function(method) {
    methods.push('"' + method.action + '" : ' + method.code);
  });
  return methods.join(",\n");
}