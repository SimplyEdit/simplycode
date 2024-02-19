function(data) {
  this.originalData = data;
  methods = [];
  data.forEach(function(method) {
    methods.push('"' + method.sorter + '" : ' + method.code);
  });
  return methods.join(",\n");
}