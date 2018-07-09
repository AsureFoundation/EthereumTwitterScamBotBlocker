	var defaultAction = "red";
	$(()=>{
		var favAction = localStorage["action"];

		// valid colors are red, blue, green and yellow
		if (favAction == undefined || (favAction != "red" && favAction != "hide")) {
			favAction = defaultAction;
		}

		var select = document.getElementById("action");
		for (var i = 0; i < select.children.length; i++) {
			var child = select.children[i];
				if (child.value == favAction) {
				child.selected = "true";
				break;
			}
		}	

		$("#action").change(()=>{			
			saveOptions();
		});
	});
	



	function saveOptions() {
		var select = document.getElementById("action");
		var action = select.children[select.selectedIndex].value;
		localStorage["action"] = action;
		chrome.storage.sync.set({"action": action}, function() {
			console.log('Saved', "action", action);
			$(".saved").show().delay(2000).hide(100);
		});		
	}

	function eraseOptions() {
		localStorage.removeItem("action");
		location.reload();
	}