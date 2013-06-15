(function () {
  function mxmlHint(editor, mxmlStructure, getToken) {
    var cur = editor.getCursor();
    var token = getToken(editor, cur);
    var keywords = [];
    var i = 0;
    var j = 0;
    var k = 0;
    var from = {line: cur.line, ch: cur.ch};
    var to = {line: cur.line, ch: cur.ch};
    var flagClean = true;

    var text = editor.getRange({line: 0, ch: 0}, cur);

    var open = text.lastIndexOf('<');
    var close = text.lastIndexOf('>');
    var tokenString = token.string.replace("<","");

    if(open > close) {
      var last = editor.getRange({line: cur.line, ch: cur.ch - 1}, cur);
      if(last == "<") {
        for(i = 0; i < mxmlStructure.length; i++) {
          keywords.push(mxmlStructure[i].tag);
        }
        from.ch = token.start + 1;
      } else {
        var counter = 0;
        var found = function(token, type, position) {
          counter++;
          if(counter > 50) return;
          if(token.type == type) {
            return token;
          } else {
            position.ch = token.start;
            var newToken = editor.getTokenAt(position);
            return found(newToken, type, position);
          }
        };

        var nodeToken = found(token, "tag", {line: cur.line, ch: cur.ch});
        var node = nodeToken.string.substring(1);

        if(token.type === null && token.string.trim() === "") {
          for(i = 0; i < mxmlStructure.length; i++) {
            if(mxmlStructure[i].tag == node) {
              for(j = 0; j < mxmlStructure[i].attr.length; j++) {
                keywords.push(mxmlStructure[i].attr[j].key + "=\"\" ");
              }

              for(k = 0; k < globalAttributes.length; k++) {
                keywords.push(globalAttributes[k].key + "=\"\" ");
              }
            }
          }
        } else if(token.type == "string") {
          tokenString = tokenString.substring(1, tokenString.length - 1);
          var attributeToken = found(token, "attribute", {line: cur.line, ch: cur.ch});
          var attribute = attributeToken.string;

          for(i = 0; i < mxmlStructure.length; i++) {
            if(mxmlStructure[i].tag == node) {
              for(j = 0; j < mxmlStructure[i].attr.length; j++) {
                if(mxmlStructure[i].attr[j].key == attribute) {
                  for(k = 0; k < mxmlStructure[i].attr[j].values.length; k++) {
                    keywords.push(mxmlStructure[i].attr[j].values[k]);
                  }
                }
              }

              for(j = 0; j < globalAttributes.length; j++) {
                if(globalAttributes[j].key == attribute) {
                  for(k = 0; k < globalAttributes[j].values.length; k++) {
                    keywords.push(globalAttributes[j].values[k]);
                  }
                }
              }
            }
          }
          from.ch = token.start + 1;
        } else if(token.type == "attribute") {
          for(i = 0; i < mxmlStructure.length; i++) {
            if(mxmlStructure[i].tag == node) {
              for(j = 0; j < mxmlStructure[i].attr.length; j++) {
                keywords.push(mxmlStructure[i].attr[j].key + "=\"\" ");
              }

              for(k = 0; k < globalAttributes.length; k++) {
                keywords.push(globalAttributes[k].key + "=\"\" ");
              }
            }
          }
          from.ch = token.start;
        } else if(token.type == "tag") {
          for(i = 0; i < mxmlStructure.length; i++) {
            keywords.push(mxmlStructure[i].tag);
          }

          from.ch = token.start + 1;
        }
      }
    } else {
      for(i = 0; i < mxmlStructure.length; i++) {
        keywords.push("<" + mxmlStructure[i].tag);
      }

      tokenString = ("<" + tokenString).trim();
      from.ch = token.start;
    }

    if(flagClean === true && tokenString.trim() === "") {
      flagClean = false;
    }

    if(flagClean) {
      keywords = cleanResults(tokenString, keywords);
    }

    return {list: keywords, from: from, to: to};
  }


  var cleanResults = function(text, keywords) {
    var results = [];
    var i = 0;

    for(i = 0; i < keywords.length; i++) {
      if(keywords[i].substring(0, text.length) == text) {
        results.push(keywords[i]);
      }
    }

    return results;
  };

  var mxmlStructure = [
    {tag: '?xml', attr: []},
    {tag: 's:Application', attr: [
      {key: 'pageTitle', values: [""]},
      {key: 'backgroundColor', values: ["#ffffff"]}
    ]},
    {tag: 's:Label', attr: [
      {key: 'id', values: [""]},
      {key: 'toolTip', values: [""]},
      {key: 'text', values: [""]}
    ]},
    {tag: 's:Button', attr: [
      {key: 'id', values: [""]},
      {key: 'icon', values: [""]},
      {key: 'toolTip', values: [""]},
      {key: 'label', values: [""]},
      {key: 'enabled', values: ["true,false"]},
      {key: 'click', values: [""]},
      {key: 'cornerRadius', values: [""]}
    ]},
    {tag: 's:CheckBox', attr: [
      {key: 'id', values: [""]},
      {key: 'toolTip', values: [""]},
      {key: 'selected', values: ["true,false"]},
      {key: 'label', values: [""]},
      {key: 'enabled', values: ["true,false"]},
      {key: 'click', values: [""]}
    ]},
    {tag: 's:ColorPicker', attr: [
      {key: 'id', values: [""]},
      {key: 'toolTip', values: [""]},
      {key: 'selectedColor', values: ["#000000"]},
      {key: 'enabled', values: ["true,false"]},
      {key: 'click', values: [""]}
    ]},
    {tag: 's:ComboBox', attr: [
      {key: 'id', values: [""]},
      {key: 'prompt', values: [""]},
      {key: 'rowCount', values: ["5"]},
      {key: 'itemRenderer', values: [""]},
      {key: 'labelField', values: [""]},
      {key: 'labelFunction', values: [""]},
      {key: 'dataProvider', values: [""]},
      {key: 'selectedIndex', values: ["-1"]},
      {key: 'selectedItem', values:[""]},
      {key: 'change', values: ["onChangeEventHandler()"]},
      {key: 'open', values: ["onOpenHandler()"]}
    ]},
    {tag: 's:DataGrid', attr: [
      {key: 'id', values: [""]},
      {key: 'requestedRowCount', values: ["5"]},
      {key: 'editable', values: [""]},
      {key: 'dataProvider', values: [""]},
      {key: 'selectionMode', values: ["none","multipleCells","multipleRows","singleCell","singleRow"]}
    ]}
  ];

  var globalAttributes = [
    {key: "visible", values: ["true,false"]},
    {key: "width", values: [""]},
    {key: "alpha", values: ["0","0.2","0.6","1"]},
    {key: "height", values: [""]},
    {key: "minWidth", values: [""]},
    {key: "minHeight", values: [""]},
    {key: "maxWidth", values: [""]},
    {key: "maxHeight", values: [""]},
    {key: "scaleX", values: [""]},
    {key: "scaleY", values: [""]},
    {key: "scaleZ", values: [""]},
    {key: "x", values: [""]},
    {key: "y", values: [""]},
    {key: "z", values: [""]},
    {key: "chromeColor", values: [""]},
    {key: "fontFamily", values: ["Arial"]},
    {key: "fontSize", values: ["1"]},
    {key: "valueCommit", values: ["onValueCommitHandler()"]},
    {key: "click", values: [""]},
    {key: "blendMode", values: ["normal","add","alpha","color","colorburn","colordodge","darken","difference","erase","exclusion","hardlight","hue","invert","layer","lighten","luminosity","multiply","saturation","screen","softlight","subtract"]}
  ];

  CodeMirror.mxmlHint = function(editor) {
    if(String.prototype.trim == undefined) {
      String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
    }
    return mxmlHint(editor, mxmlStructure, function (e, cur) { return e.getTokenAt(cur); });
  };
})();
