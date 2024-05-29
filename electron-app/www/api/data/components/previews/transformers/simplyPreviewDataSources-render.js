function(data) {
  this.originalData = data;
  methods = [];
  data.forEach(function(method) {
	methods.push('editor.addDataSource("' + method.dataSource + '", {');
    methods.push('  load : function(el, callback) {');
    methods.push('    ' + method['load-code']);
    methods.push('  },');
    methods.push('  save : function(data) {');
    methods.push('    ' + method['save-code']);
    methods.push('  },');
    methods.push('  get : function(el) {');
    methods.push('    ' + method['get-code']);
    methods.push('  },');
    methods.push('  set : function(el, data) {');
    methods.push('    ' + method['set-code']);
    methods.push('  },');
    methods.push('});');
  });
  return methods.join("\n");
}