function(data) {
  this.originalData = data;
  methods = [];
  data.forEach(function(method) {
    lines = [];
    lines.push('// ' + method.base);
    lines.push('"' + method.transformer + '" : {');
    lines.push('  render : ' + method['render-code'].replace(/\n/g, "\n  ") + ',');
    lines.push('  extract : ' + method['extract-code'].replace(/\n/g, "\n  "));
    lines.push('}');
    methods.push(lines.join("\n"));
  });
  return methods.join(",\n");
}