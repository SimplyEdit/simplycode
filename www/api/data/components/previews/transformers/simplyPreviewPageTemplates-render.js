function(data) {
  this.originalData = data;
  methods = [];
  data.forEach(function(method) {
    methods.push('<template data-simply-template="' + method.page + '">');
    methods.push('  ' + method.code);
    methods.push('</template>');
  });
  return methods.join("\n");
}