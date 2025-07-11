function(assert) {
  editor = {
    "pageData" : {
      "component" : {
        "parts" : {
          "componentTemplates" : []
        }
      }
    }
  };
  
  assert.equal(editor.pageData.component.parts.componentTemplates.length, 0);
  commands.addComponentTemplate();
  assert.equal(editor.pageData.component.parts.componentTemplates.length, 1);
  commands.addComponentTemplate();
  assert.equal(editor.pageData.component.parts.componentTemplates.length, 2);
}