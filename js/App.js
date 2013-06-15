var mxml, code ="";
var wprop,selectedComponent,elements;
var excluded = ['Panel','ColorPicker','DataGrid','ComboBox','Application','NumericStepper','Label','TextArea','TextInput','Image'];
editor =null;
var _x = 0;
var _y = 0;

$(function()
{
      	deleteElements();
		if(!editor)
		{
			editor = CodeMirror.fromTextArea(document.getElementById("source_code"), {
			mode: {name: "xml", alignCDATA: true},
			theme: 'eclipse',
			autoCloseTags: true,
			lineNumbers: true,
			lineWrapping:true,
			extraKeys: {"Ctrl-Space": "autocomplete"}
			});
		}
		$.get("js/ui/flexui.html", function (data) {
                    $(".sidetab").append(data);
                    $("#components").treeview({animated:"fast",control:'h4'});
                    $(".dragg").disableSelection();
					$(".dragg").draggable({
						cursor:"move",
						drag: function (e, t) {
				            t.helper.width(200);
				        },
				        helper: "clone",
				        snap:true,
				        stop: handleDropEvent
				        /**
				        	function (e, t) {
				            $("#design").sortable({
				                opacity: .35,
				                connectWith: ".dragg"
				            })

				        }*/
					});
         });
	  showProperties();
      $("#switchViews a:first").on('shown',function(){
      	if(wprop !== undefined)
      	{
      		$("#properties").hide();
      	}
		CodeMirror.commands.autocomplete = function(cm) {
	 		CodeMirror.showHint(cm, CodeMirror.mxmlHint);
		}
		getCode();
		editor.refresh();
      });		

    $("#switchViews a:last").on('click',function(){
    	$("#properties").show();
    });
	$("#switchViews a:last").tab('show');
		$(".CodeMirror").height($(document).height()-80);
	$("#design").height($(document).height()-5);
	$(window).on('resize',function(){
		$(".CodeMirror").height($(document).height()-80);
		$("#design").height($(document).height()-5);
		$("#properties").css("top","30%");
		$("#properties").css("left","70%");
	});
	$("#design").droppable({
		greedy:true,
		drop: handleDropEvent
	});
	$('#props').on('switch-change', function (e, data) {
	    var value = data.value;
	    var show = value === true ? 'visible' : 'hidden';
	    $("#properties").css('visibility',show);
	});
	$('#comps').on('switch-change', function (e, data) {
	    var value = data.value;
	    var show = value === true ? 'visible' : 'hidden';
	    if(value){
	    	$("#designer").removeClass('span12').addClass('span10');
	    }else{
	    	$("#designer").removeClass('span10').addClass('span12');
	    }
	    $("#components").css('visibility',show);
	});
	$(document).on('click','.ui',function (e){
		e.preventDefault();
		$("#design .ui").each(function(){
    		$(this).freetrans('controls',false);
    	});
	    if(wprop !== undefined)
		{
			$("#properties .row").html(reflectProperties($(e.currentTarget)));
			$("#properties").height($("#properties form").height()+15);
		}
		$(e.currentTarget).freetrans('controls',true);
	     e.stopImmediatePropagation();
	});
	$(document).on('click','#design',function (e){
		e.preventDefault();
		selectedComponent = "";
    	$(".ui").each(function(){
    		$(this).freetrans('controls',false);
    	});
    	if(wprop !== undefined)
		{
			$("#properties .row").html(reflectProperties($(e.currentTarget)));
			$("#properties").height($("#properties form").height()+25);
		}
   	 	e.stopImmediatePropagation();
	});
	$(document).on('blur',".input-mini",function(e){
		
		var posX,posY, elW,elH;
		if($(this).attr('name') === 'x')
		{
			posX = Math.round(parseFloat($(this).val()));
		}
		if($(this).attr('name') === 'y'){
			posY = Math.round(parseFloat($(this).val()));
		}
		if($(this).attr('name')==='width'){
			elW = $(this).val();
				$(document).find("#"+selectedComponent).css({'width':$(this).val()});
				$(document).find("#"+selectedComponent).next().css('width',$(this).val());
		}
		if($(this).attr('name')==='height'){
				$(document).find("#"+selectedComponent).css('height',$(this).val());
				$(document).find("#"+selectedComponent).next().css('height',$(this).val());
				elH= $(this).val();
		}
		if($(this).attr('name')==='top'){
				$(document).find("#"+selectedComponent).css('top',$(this).val());
				$(document).find("#"+selectedComponent).next().css('top',$(this).val());
		}
		if($(this).attr('name')==='left'){
				$(document).find("#"+selectedComponent).css('left',$(this).val());
				$(document).find("#"+selectedComponent).next().css('left',$(this).val());
		}
		if($(document).find("#"+selectedComponent).data('type') === 'Label' && $(this).attr('name') === 'text')
		{
			$(document).find("#"+selectedComponent).text($(this).val());
		}
		if($(document).find("#"+selectedComponent).data('type') === 'Button' && $(this).attr('name') === 'label')
		{
			$(document).find("#"+selectedComponent).text($(this).val());
		}
		if($(document).find("#"+selectedComponent).data('type') === 'CheckBox' && $(this).attr('name') === 'label')
		{
			var lbl = $(this).val();
			$(document).find("#"+selectedComponent).find('span').text(lbl);
		}
		if($(document).find("#"+selectedComponent).data('type') === 'Panel' && $(this).attr('name') === 'title')
		{
			var title = $(this).val();
			$(document).find("#"+selectedComponent).find('.panel-title').text(title);
		}
		if($(document).find("#"+selectedComponent).data('type') === 'Image' && $(this).attr('name') === 'src')
		{
			var src = $(this).val() === "http://placehold.it/200x200"? 'http://placehold.it/'+elW+'x'+elH:$(this).val();
			$(document).find("#"+selectedComponent).find('img').attr('src',src);
		}
		if($(this).attr('name') !== 'x' && $(this).attr('name') !== 'y')
		{
			$(document).find("#"+selectedComponent).attr($(this).attr('name'),$(this).val());
		}
		if($(this).attr('name') === 'enabled' || $(this).attr('name') === 'visible' || $(this).attr('name') === 'prompt'
		|| $(this).attr('name') === 'requestedRowCount' )
		{
			$(document).find("#"+selectedComponent).attr($(this).attr('name'),$(this).val());
		}
		if($(this).attr('name') === 'requestedRowCount')
		{
			var cols = $(this).val();
			var theads ='';
			var trows = '';
			for(var k=1;k<=cols;k++){
				theads +='<th>Column'+k+'</th>\n';
				trows  += '<td>Item '+k+'</td>\n';
			}
		$(document).find("#"+selectedComponent).find('tr:first').html(theads);
		$(document).find("#"+selectedComponent).find('tr:gt(0)').html(trows);
			
		}
		
		$(document).find("#"+selectedComponent).freetrans({x:posX,y:posY}).css({width:elW,height:elH});

	});
});
function showProperties()
{
    	 $.get("js/ui/properties.html", function (data) {
    	 	if(wprop === undefined){
    	 	wprop = data;
    	 	$("body").append($(wprop));  
    	 	$("#properties").draggable({containment: "#design",handle:'.prop_title'});
    	 	$('.prop_title').disableSelection();
    	 }else{
    	 	$("#properties").show();
    	 }
    	 });
}
function handleDropEvent( event, ui ) {
  var draggable = ui.draggable;
  var position = $("#design").offset();
   _x = Math.floor(ui.position.left - position.left);
   _y = Math.floor(ui.position.top - position.top);
   w = Math.floor(ui.width);
   h = Math.floor(ui.height);

  switch($(draggable).data('type'))
  {
  		 case"button":
  		    $btn = $(UI.button());
  		 	alignEl($btn);
  		 	break;
  		 case  "checkbox":
  		 	$check = $(UI.checkbox());
  		  	alignEl($check);
  		 break;
  		 case "colorpicker":
  		  	$cpiker = $(UI.colorpicker());
  		  	alignEl($cpiker);
  		 break;	
  		 case "combobox":
  		  	$cbx = $(UI.combobox());
  		  	alignEl($cbx);
  		 break;
  		 case "datagrid":
  		  	$dg = $(UI.datagrid());
  		  	alignEl($dg);
  		 break;
  		 case "numericstepper":
  		 	$ntp = $(UI.numericstepper());
  		 	 alignEl($ntp);
  		 break;
  		 case "label":
  		 	$lbl = $(UI.label());
  		 	alignEl($lbl);
  		 break;
  		 case "textinput":
  		 	$txti = $(UI.textinput());
  		 	alignEl($txti);
  		 break;
  		 case "textarea":
  		 	$txta = $(UI.textarea());
  		 	alignEl($txta);
  		 break;
  		 case "image":
  		 	$imgs = $(UI.image('http://placehold.it/'+200+'x'+200));
  		 	alignEl($imgs);
  		 break;
  		 case "panel":
  		 	$panel = $(UI.panel());
  		 	alignEl($panel);
  		 break;  		 
  }
  getCode();
}
function getCode()
{
  parseToMXML();
}

function reflectProperties(target)
{		selectedComponent = $(target).attr('id');
		if(selectedComponent !== undefined)
		{
		var item 	= new Object();
			item.id     = $(target).attr('id') === "design"? "" : $(target).attr('id');
			item.type   = $(target).data('type') === undefined ? "Application" : $(target).data('type') ;
			if($.inArray($('#'+selectedComponent).data('type'),excluded) === -1)
			{
				item.label  = $(target).text() === undefined ? "" : $(target).text();
			}
			if(item.type === "ComboBox")
			{
				item.prompt = $(target).attr('prompt') === undefined? "" : $(target).attr('prompt') ;	
			}
			if(item.type === "DataGrid")
			{
				item.requestedRowCount = $(target).attr('requestedRowCount') === undefined? 3 : $(target).attr('requestedRowCount') ; 
			}
			if(item.type === "Label")
			{
				item.text = $(target).text();
			}
			if(item.type === "Panel")
			{
				item.title = $(target).find('.panel-title').text();
			}
			if(item.type === "Image")
			{
				item.src = $(target).find('img').attr('src');
			}
			item.width  = Math.round(parseFloat($(target).css('width')));
			item.height = Math.round(parseFloat($(target).css('height')));
			item.x      = isNaN(Math.round(parseFloat($(target).css('left')))) ? 0 :  Math.round(parseFloat($(target).css('left')));
			item.y      = isNaN(Math.round(parseFloat($(target).css('top')))) ? 0 : Math.round(parseFloat($(target).css('top'))); 
			item.enabled = item.enabled === true? false : true;
		}
	    var entities ="";
		$.each(item,function(key,value){
		 	if(key !== 'type' && value !== undefined)
		 	{
		 		var inputs;
		 		if(value.constructor !== Boolean){
		 			inputs = '\t\t\t<input id="'+key+'" name="'+key+'" value="'+value +'" type="text" placeholder="" class="input-mini" required="">\n';
		 		}else{
		 			inputs = '\t\t\t<select class="input-mini" id="'+key+'"  name="'+key+'">\n\t\t<option>true</option>\n\t\t<option>false</option>\n';
		 		}
			entities+= '<div class="control-group">\n\
			 \t<label class="control-label">'+key+'</label>\n\
			 \t\t<div class="controls">\n'+inputs+ '\n</div>\n';
			}
		});
		return '<b>type: '+item.type+'</b>\n\<form class="form-horizontal">\n\
		 <fieldset>\n'+ entities+'</fieldset></form>';

}
function parseToMXML()
{

	mxml = "";
	try{
		elements = new Array();
		

		$("#design").find('.ui').each(function(i,el){
			item 	= new Object();
			item.type   = $(el).data('type');
			item.id     = $(el).attr('id');
			item.width  = Math.round(parseFloat($(el).css('width')));
			item.height = Math.round(parseFloat($(el).css('height')));
			item.x      = Math.round(parseFloat($(el).css('left')));
			item.y      = Math.round(parseFloat($(el).css('top')));
			item.label 	= $(el).text() !== "" ? '" label="'+$(el).text() : "";

			item.enabled = $(el).attr('enabled') !== undefined ? ' enabled="'+$(el).attr('enabled')+' "':' ';

		if($(el) !== undefined && excluded.indexOf($(el).data('type')) === -1 )
		{
			item.tag 	= '<s:'+item.type +item.enabled+' id="'+item.id+ item.label+ '" width="'+item.width+'" height="'+item.height+
							'" x="'+item.x+ '" y="'+item.y+'"></s:'+item.type+'>'+"\n";
		}else{
			item.tag 	= '<s:'+item.type +' id="'+item.id+'" x="'+item.x+ '" y="'+item.y+'"></s:'+item.type+'>'+"\n";
		}
		if($(el).data('type') === "Label"){
			item.text   = $(el).text() !== "" ? '" text="'+$(el).text(): "";
			item.tag 	= '<s:'+item.type +item.enabled+' id="'+item.id+ item.text+
							'" x="'+item.x+ '" y="'+item.y+'"></s:'+item.type+'>'+"\n";
		}
		if($(el).data('type') === "Panel"){
			item.title   = $(el).find('.panel-title').text() !== "" ? '" title="'+$(el).find('.panel-title').text(): "";
			item.tag 	= '<s:'+item.type+ ' id="'+item.id+ item.title+
							'" x="'+item.x+ '" y="'+item.y+'"></s:'+item.type+'>'+"\n";
		}
		if($(el).data('type') === "Image"){
			item.source   = ' source="'+$(el).find('img').attr('src')+'" ';
			item.tag 	= '<s:'+item.type +' id="'+item.id+'"'+ item.source + 'x="'+item.x+ '" y="'+item.y+'" width="'+item.width+'" height="'+item.height+'"></s:'+item.type+'>'+"\n";
		}
		 if($(el).data('type') === "ComboBox"){
		 	item.prompt = $(el).attr('prompt') !== undefined ? ' prompt="'+$(el).attr('prompt')+'"': '';
		 	var sel = $('#'+$(el).attr('id')).find('option'); 
		 	var els='';
		 	$.map(sel,function(item){ els+='\t\t\t<fx:String>'+item.value+'</fx:String>\n';});

		 	item.tag = '<s:'+item.type+ ' id="'+item.id +'"'+ item.prompt +' x="'+item.x+'" y="'+item.y+'" width="'+item.width+'" height="'+item.height+'">\n'+
		 				'\t<s:dataProvider>\n \t\t<s:ArrayList>\n'+els+'\t\t</s:ArrayList>\n\t</s:dataProvider>\n'+
		 			'</s:'+item.type+'>\n';
		 }
		 if($(el).data('type') == "DataGrid"){
		 		var colmxml = "";
		 		item.requestedRowCount = $(el).attr('requestedRowCount') === undefined?3 : $(el).attr('requestedRowCount');
		 		var count = item.requestedRowCount;
		 		for(var j=1;j<=count;j++){
		 			  colmxml += '\t\t\t<s:GridColumn dataField="dataField'+j+'" headerText="ColumnName'+j+'"></s:GridColumn>\n';
				};
			item.tag = '<s:'+item.type+ ' id="'+item.id+'" x="'+item.x+'" y="'+item.y+'" width="'+item.width+'" height="'+item.height+'">\n'+
		 				'\t<s:columns>\n \t\t<s:ArrayList>\n'+colmxml+'\t\t</s:ArrayList>\n\t</s:columns>\n\t\t<s:ArrayList>\n\t\t<!-- your itens here -->\n\t\t</s:ArrayList>\n'+
		 			'</s:'+item.type+'>\n';
		 }
			elements.push(item);
			$(elements[i]).each(function (k,v){
				//elements[i] = item;
				//elements[i] = item;
			});

		});
			mxml = UI.ApplicationStart();
			for (var i = 0; i < elements.length; i++) {
				mxml += elements[i].tag;
			};
			mxml += UI.ApplicationEnd();
			editor.setValue(mxml);
	}catch(TypeError){
	}
}
function deleteElements()
{
		$(window).keyup(function(e){
		if(e.keyCode == 46){
			$(document).find($("#"+selectedComponent)).freetrans('destroy');
			$(document).find($("#"+selectedComponent)).remove();
			$("#properties .row").html(reflectProperties());
		}
	});
}
function alignEl($target)
{
  var x = _x;
  var y =_y;
  $("#design").append($target.css({'top':y+'px','left':x+'px'}).on('click',function(){$(this).freetrans({x:$(this).position().left,y:$(this).position().top},'controls',true)}));
}