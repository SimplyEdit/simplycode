function(assert) {
  var button = document.createElement("button");
  window.editor = {
    "pageData" : {
      "component" : {
        "parts" : {
          "actions" : []
        }
      }
    }
  };

  commands.addAction(button);
  assert.equal(
    editor.pageData.component.parts.actions.length,
    1,
    "button adds an action"
  );

  commands.addAction(button);
  assert.equal(
    editor.pageData.component.parts.actions.length,
    2,
    "button adds an action"
  );
}