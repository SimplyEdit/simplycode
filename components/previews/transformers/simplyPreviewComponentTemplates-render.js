function(data) {
  this.originalData = data;
  methods = [];
  data.forEach(function(method) {
    methods.push('<!-- ' + method.base + '-->');
    methods.push('<template id="' + method.component + '">');
    methods.push('  ' + method.code);
    methods.push('</template>');
  });
  return methods.join("\n");
}