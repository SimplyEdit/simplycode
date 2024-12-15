function() {
  var subject = simplyRawApi.projectUrl + "page-frame/";

  return simplyDataApi.listFiles(subject)
  .then(function(componentParts) {
    if (componentParts.length === 0) {
      return [];
    }
    let partPromises = [];
    componentParts.forEach(function(componentPart) { // 
      partPromises.push(
        simplyRawApi.get(componentPart)
        .then(function(response) {
          if (response.status === 200) {
            return response.text()
          }
        })
        .then(function(contents) {
          return {
            "id" : componentPart.replace(subject, ''),
            "contents" : contents
          }                
        })
      );
    });
    return Promise.all(partPromises);
  })
  .then(function(partContents) {
    return {
      "id" : componentType.replace(subject, '').replace(/\/$/, ''),
      "contents" : partContents
    }
  })
  .then(function(component) {
    return simplyDataApi.mergePageFrame(component);
  })
  .catch(function() {
    let defaults = {
      "componentPreview.html" : "&lt;!DOCTYPE HTML&gt;\n&lt;html lang=\"en\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"utf-8\"&gt;\n    &lt;!-- Component CSS --&gt;\n    &lt;style&gt;\n      &#123;&#123;componentCss&#125;&#125;\n    &lt;/style&gt;\n    &lt;!-- /Component CSS --&gt;\n    &lt;!-- Page CSS --&gt;\n    &lt;style&gt;\n      &#123;&#123;pageCss&#125;&#125;\n    &lt;/style&gt;\n    &lt;!-- /Page CSS --&gt;\n    &lt;!-- Head HTML --&gt;\n    &#123;&#123;headHtml&#125;&#125;\n    &lt;!-- /Head HTML --&gt;\n    &lt;script&gt;\n      function clone(ob) &#123;\n        return JSON.parse(JSON.stringify(ob));\n      &#125;\n      function updateDataSource(name) &#123;\n        document.querySelectorAll('[data-simply-data=\"'+name+'\"]').forEach(function(list) &#123;\n          editor.list.applyDataSource(list, name);\n          list.dataBindingPaused = 0;\n        &#125;);\n      &#125;\n    &lt;/script&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;!-- Component HTML templates --&gt;\n    &#123;&#123;componentTemplates&#125;&#125;\n    &lt;!-- /Component HTML templates --&gt;\n    &lt;div class=\"main\"&gt;\n      &#123;&#123;componentPreview&#125;&#125;\n    &lt;/div&gt;\n    &lt;script src=\"js/simply.everything.js\"&gt;&lt;/script&gt;\n    &lt;script src=\"js/simply-edit.js\" data-simply-storage=\"none\" data-api-key=\"muze\"&gt;&lt;/script&gt;\n    &lt;script&gt;\n      /* Transformers */\n      editor.transformers = &#123;\n        &#123;&#123;transformers&#125;&#125;\n      &#125;;\n      /* /Transformers */\n    &lt;/script&gt;\n    &lt;script&gt;\n      /* Sorters */\n      editor.sorters = &#123;\n        &#123;&#123;sorters&#125;&#125;\n      &#125;;\n      /* /Sorters */\n    &lt;/script&gt;\n    &lt;script&gt;\n      window.addEventListener(\"simply-content-loaded\", function() &#123;\n        /* Data sources */\n        &#123;&#123;dataSources&#125;&#125;\n        /* /Data sources */\n      &#125;);\n    &lt;/script&gt;\n    &lt;!-- Foot HTML --&gt;\n    &#123;&#123;footHtml&#125;&#125;\n    &lt;!-- /Foot HTML --&gt;\n  &lt;/body&gt;\n&lt;/html&gt;",
      "fullApp.html" : "&lt;!DOCTYPE HTML&gt;\n&lt;html lang=\"en\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"utf-8\"&gt;\n    &lt;!-- Component CSS --&gt;\n    &lt;style&gt;\n      &#123;&#123;componentCss&#125;&#125;\n    &lt;/style&gt;\n    &lt;!-- /Component CSS --&gt;\n    &lt;!-- Page CSS --&gt;\n    &lt;style&gt;\n      &#123;&#123;pageCss&#125;&#125;\n    &lt;/style&gt;\n    &lt;!-- /Page CSS --&gt;\n    &lt;!-- Head HTML --&gt;\n    &#123;&#123;headHtml&#125;&#125;\n    &lt;!-- /Head HTML --&gt;\n    &lt;script&gt;\n      var simplyDataApi = &#123;&#125;;\n      var simplyApp = &#123;&#125;;\n      window.addEventListener(\"simply-content-loaded\", function() &#123;\n        simply.bind = false;\n        /* Raw API */\n        var simplyRawApi = &#123;\n          &#123;&#123;rawApi&#125;&#125;\n        &#125;;\n        /* End of Raw API */\n        /* Data API */\n        simplyDataApi = &#123;\n          &#123;&#123;dataApi&#125;&#125;\n        &#125;;\n        /* End of Data API */\n        simplyApp = simply.app(&#123;\n          /* Actions */\n          actions: &#123;\n            &#123;&#123;actions&#125;&#125;\n          &#125;,\n          /* /Actions */\n          /* Commands */\n          commands: &#123;\n            &#123;&#123;commands&#125;&#125;\n          &#125;,\n          /* /Commands */\n          /* Routes */\n          routes: &#123;\n            &#123;&#123;routes&#125;&#125;\n          &#125;\n          /* /Routes */\n        &#125;);\n      &#125;);\n      function clone(ob) &#123;\n        return JSON.parse(JSON.stringify(ob));\n      &#125;\n      function updateDataSource(name) &#123;\n        document.querySelectorAll('[data-simply-data=\"'+name+'\"]').forEach(function(list) &#123;\n          editor.list.applyDataSource(list, name);\n          list.dataBindingPaused = 0;\n        &#125;);\n      &#125;\n    &lt;/script&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;!-- Body HTML --&gt;\n    &#123;&#123;bodyHtml&#125;&#125;\n    &lt;!-- /Body HTML --&gt;\n    &lt;!-- Component HTML templates --&gt;\n    &#123;&#123;componentTemplates&#125;&#125;\n    &lt;!-- /Component HTML templates --&gt;\n    &lt;div class=\"main\" data-simply-field=\"page\" data-simply-content=\"template\"&gt;\n    &lt;!-- Page HTML templates --&gt;\n    &#123;&#123;pageTemplates&#125;&#125;\n    &lt;!-- /Page HTML templates --&gt;\n    &lt;/div&gt;\n    &lt;script src=\"js/simply.everything.js\"&gt;&lt;/script&gt;\n    &lt;script src=\"js/simply-edit.js\" data-simply-storage=\"none\" data-api-key=\"muze\"&gt;&lt;/script&gt;\n    &lt;script&gt;\n      /* Transformers */\n      editor.transformers = &#123;\n        &#123;&#123;transformers&#125;&#125;\n      &#125;;\n      /* /Transformers */\n    &lt;/script&gt;\n    &lt;script&gt;\n      /* Sorters */\n      editor.sorters = &#123;\n        &#123;&#123;sorters&#125;&#125;\n      &#125;;\n      /* /Sorters */\n    &lt;/script&gt;\n    &lt;script&gt;\n      window.addEventListener(\"simply-content-loaded\", function() &#123;\n        /* Data sources */\n        &#123;&#123;dataSources&#125;&#125;\n        /* /Data sources */\n      &#125;);\n    &lt;/script&gt;\n    &lt;!-- Foot HTML --&gt;\n    &#123;&#123;footHtml&#125;&#125;\n    &lt;!-- /Foot HTML --&gt;\n  &lt;/body&gt;\n&lt;/html&gt;",
      "pagePreview.html" : "&lt;!DOCTYPE HTML&gt;\n&lt;html lang=\"en\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"utf-8\"&gt;\n    &lt;!-- Component CSS --&gt;\n    &lt;style&gt;\n      &#123;&#123;componentCss&#125;&#125;\n    &lt;/style&gt;\n    &lt;!-- /Component CSS --&gt;\n    &lt;!-- Page CSS --&gt;\n    &lt;style&gt;\n      &#123;&#123;pageCss&#125;&#125;\n    &lt;/style&gt;\n    &lt;!-- /Page CSS --&gt;\n    &lt;!-- Head HTML --&gt;\n    &#123;&#123;headHtml&#125;&#125;\n    &lt;!-- /Head HTML --&gt;\n    &lt;script&gt;\n      function clone(ob) &#123;\n        return JSON.parse(JSON.stringify(ob));\n      &#125;\n      function updateDataSource(name) &#123;\n        document.querySelectorAll('[data-simply-data=\"'+name+'\"]').forEach(function(list) &#123;\n          editor.list.applyDataSource(list, name);\n          list.dataBindingPaused = 0;\n        &#125;);\n      &#125;\n    &lt;/script&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;!-- Component HTML templates --&gt;\n    &#123;&#123;componentTemplates&#125;&#125;\n    &lt;!-- /Component HTML templates --&gt;\n    &lt;div class=\"main\" data-simply-field=\"page\" data-simply-content=\"template\"&gt;\n      &#123;&#123;pagePreview&#125;&#125;\n    &lt;/div&gt;\n    &lt;script src=\"js/simply.everything.js\"&gt;&lt;/script&gt;\n    &lt;script src=\"js/simply-edit.js\" data-simply-storage=\"none\" data-api-key=\"muze\"&gt;&lt;/script&gt;\n    &lt;script&gt;\n      /* Transformers */\n      editor.transformers = &#123;\n        &#123;&#123;transformers&#125;&#125;\n      &#125;;\n      /* /Transformers */\n    &lt;/script&gt;\n    &lt;script&gt;\n      /* Sorters */\n      editor.sorters = &#123;\n        &#123;&#123;sorters&#125;&#125;\n      &#125;;\n      /* /Sorters */\n    &lt;/script&gt;\n    &lt;script&gt;\n      window.addEventListener(\"simply-content-loaded\", function() &#123;\n        /* Data sources */\n        &#123;&#123;dataSources&#125;&#125;\n        /* /Data sources */\n      &#125;);\n    &lt;/script&gt;\n    &lt;!-- Foot HTML --&gt;\n    &#123;&#123;footHtml&#125;&#125;\n    &lt;!-- /Foot HTML --&gt;\n  &lt;/body&gt;\n&lt;/html&gt;"
    };

    let elements = {};
    let component = [];
    for (i in defaults) {
      elements[i] = document.createElement("pre");
      elements[i].innerHTML = defaults[i];

      component.push({
        "id" : i,
        "contents" : elements[i].innerText
      });
    }
    return simplyDataApi.mergePageFrame(component);
  });
}