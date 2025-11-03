function(data) {
  this.originalData = data;
  methods = [];
  data.forEach(function(method) {
    methods.push('/* ' + method.name + ' (' + method.base + ') */');
    methods.push(method.code);
  });
  return methods.join("\n");
}