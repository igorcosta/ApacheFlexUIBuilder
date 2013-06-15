;var UI = {
	 generateUUID:function () {
	    var d = new Date().getTime();
	    var uuid = 'xxxx'.replace(/[xy]/g, function(c) {
	        var r = (d + Math.random()*4)%15 | 0;
	        d = Math.floor(d/16);
	        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
	    });
	    return uuid;
	},
		ApplicationStart:function()
		{

		return '<?xml version="1.0" encoding="utf-8"?>\n\
	<s:Application xmlns:fx="http://ns.adobe.com/mxml/2009"\n\
				xmlns:s="library://ns.adobe.com/flex/spark"\n\
		  		 xmlns:mx="library://ns.adobe.com/flex/mx" minWidth="955" minHeight="600">\n\
					<fx:Declarations>\n\
					\t\t\<!-- Place non-visual elements (e.g., services, value objects) here -->\n\
					</fx:Declarations>\n';
		},
		ApplicationEnd:function()
		{
				return '</s:Application>';
		},
	    button:function (label)
	    {
	    	if(label == null)
	    		label = "Button";
	    	//return '<a class="btn btn-primary btn-large" href="#">'+label+'</a>';
	    	return '<div id="btn'+this.generateUUID()+'" class="ui flex-button trans" data-type="Button">'+label+'</div>\n';
	    },
	   	checkbox:function ()
	    {
	    	return '<div id="chk'+this.generateUUID()+'" class="ui flex-checkbox trans" data-type="CheckBox">'+
	    			'<label class="checkbox inline">'+
					  '<input type="checkbox" id="inlineCheckbox3" value="option3"><span>checkbox</span>'+
					'</label>'+
	    			'</div>';
	    },
	    colorpicker: function()
	    {
	    	return '<div id="cpiker'+this.generateUUID()+'" class="ui flex-cpicker trans" data-type="ColorPicker">\n\
	    	</div>';
	    },
	    combobox: function(arr)
	    {		var cbx;
	    		var options='<select onfocus="window.focus();" id="cbx'+this.generateUUID()+'" class="flex-combobox ui trans" data-type="ComboBox">\n';
	    		if( arr !== undefined)
	    		{
	    			for (var i = 0; i < arr.length; i++) {
	    				 var item = '\t <option value="'+arr[i]+'">'+arr[i]+'</option>\n';
	    				 options +=item;
	    			};
	    			options += '</select>';
	    			cbx = options;
	    		}else{
	    			cbx = '<select onfocus="window.focus();" id="cbx'+this.generateUUID()+'" class="flex-combobox ui trans" data-type="ComboBox">\n\
							  <option value="item 1">Item 1</option>\n\
							  <option value="item 2">Item 2</option>\n\
							  <option value="item 3">Item 3</option>\n\
							  <option value="item 4">Item 4</option>\n\
							</select>';
	    		}

	    		return cbx;
	    },
	    datagrid :function(){
	    		var table = '<div class="flex-dg trans ui"  id="cbx'+this.generateUUID()+'" data-type="DataGrid">'+
	    	  ' <table class=" table table-striped">'+
              '<thead>'+
                '<tr>'+
                 '<th>#</th>'+
                  '<th>Column 1</th>'+
                  '<th>Column 2</th>'+
                  '<th>Column 3</th>'+
                '</tr>'+
              '</thead>'+
              '<tbody>'+
               '<tr>'+
                  '<td>1</td>'+
                  '<td>Foo 1</td>'+
                  '<td>Bar</td>'+
                  '<td>Foobar</td>'+
                '</tr>'+
                '<tr>'+
                  '<td>2</td>'+
                  '<td>Foo 2</td>'+
                  '<td>Bar</td>'+
                  '<td>Foobar</td>'+
                '</tr>'+
                '<tr>'+
                 '<td>3</td>'+
                  '<td>Foo 3</td>'+
                  '<td>Bar</td>'+
                  '<td>Foobar</td>'+
                '</tr>'+
             '</tbody>'+
            '</table>'+
            '</div>';

            return table;
	    },
	    numericstepper: function(){
	    	var ntp = '<div id="ntp'+this.generateUUID()+'" data-type="NumericStepper" class="ui trans spinner flex-ntp">\n\
						<input type="text" class="input-mini spinner-input">\n\
							<div class="spinner-buttons	btn-group btn-group-vertical">\n\
								\t\t<button type="button" class="btn spinner-up">\n\
									\t\t<i class="icon-chevron-up"></i>\n\
								\t</button>\n\
								\t<button type="button" class="btn spinner-down">\n\
									\t<i class="icon-chevron-down"></i>\n\
								\t</button>\n\
							\t</div>\n\
						</div>';
			return ntp;
	    },
	    label :function (){
	    	var lbl = '<div id="ntp'+this.generateUUID()+'" data-type="Label" class="ui trans flex-label">Label</div>';
	    	return lbl;
	    },
	    textinput:function(){
	    	 return '<div id="txti'+this.generateUUID()+'" class="ui trans" data-type="TextInput">'+
	    			'<label class="inline">'+
					  '<input type="text" class="input-block-level" id="textid" value="">'+
					'</label>'+
	    			'</div>';
	    },
	    textarea:function(){
	    	 return '<div id="txta'+this.generateUUID()+'" class="ui trans flex-textarea" data-type="TextArea">'+
	    			'<textarea>'+
	    			'</textarea>';
	    },
	    image:function(src){
	    	 return '<div id="img'+this.generateUUID()+'" class="ui trans img-polaroid flex-image" data-type="Image">'+
	    	 	'<img src="'+src+'"/>'+
	    	 	'</div>';
	    },
	    //Layouts

	    panel:function(){
	    		var p ='<div id="pn'+this.generateUUID()+'" data-type="Panel" class="ui trans flex-panel">\n\
					<div class="panel-title">Sample Panel</div>\n\
					<div class="group"></div>\n\
	    		</div>';
	    		return p;
	    }

};