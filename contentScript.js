$.getJSON("https://raw.githubusercontent.com/AsureFoundation/EthereumTwitterScamBotBlocker/master/twitter.json", function(response) {

	var json = response;
	this.json = json;
	var action = "red";
	var counter = 0;
	chrome.storage.sync.get(['action'], function(result) {
		console.log('action currently is ' + result.action);
        action = result.action || "red";
	});
	
	function modify(){
		$('.tweet').each(function(index){
			var jt = $(this);			
			var blacklist = json.blacklist;			
			if(blacklist[jt.attr("data-user-id")]!==undefined){
				console.log("hit: "+jt.attr("data-user-id") +" - "+jt.attr("data-screen-name"));
				jt.attr("data-etsbb","true");				
				if(action==="hide")
				{jt.hide();}
				else
				{jt.css("background-color","red");}					
			}
		});		
		counter = $('.tweet[data-etsbb="true"]').length;
		if(counter>0)
		{
			var tweetsText = $("ul.ProfileNav-list li.ProfileNav-item--tweets span.ProfileNav-value");
			var number=tweetsText.attr("data-count");
			tweetsText.html(number+'/<span style="color:red">'+counter+'</span>');
		}		
	}
	
	function setIntervalAndExecute(fn, t) {
		fn();
		return(setInterval(fn, t));
	}
		
	var i = setIntervalAndExecute(modify, 3000);

});