
$.getJSON("https://raw.githubusercontent.com/AsureFoundation/EthereumTwitterScamBotBlocker/master/twitter.json", function(response) {

	var json = response;
	this.json = json;
	
	function modify(){
		chrome.storage.sync.get(['action'], function(result) {
			console.log('action currently is ' + result.action);
        	var action = result.action || "red";
			
			$('.tweet').each(function(index){
				var t = $(this).html();
				var jt=$(this);
				console.log(jt.attr("data-user-id") +" - "+jt.attr("data-screen-name"));
				var blacklist=json.blacklist;			
				if(blacklist[jt.attr("data-user-id")]!==undefined){
					if(action==="hide")
					{jt.hide();}
					else
					{jt.css("background-color","red");}					
				}
			});
		});
	}

	function DOMModificationHandler(){
		$(this).unbind('DOMSubtreeModified.event1');
		setTimeout(function(){
			modify();
			$('#timeline').bind('DOMSubtreeModified.event1',DOMModificationHandler);
		},10);
	}

	$('#timeline').bind('DOMSubtreeModified.event1',DOMModificationHandler);						   
});