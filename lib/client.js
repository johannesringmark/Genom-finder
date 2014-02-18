


window.App = (function() {

	var IndexedDBStore = require("indexeddbstore");

	function App(options){
		this.options = options;
		this.metadata = {};
		this.rawInput;
		this.genInput = [];
		this.markInput = [];

		var indexedDB = window.indexedDB ||
		window.webkitIndexedDB ||
		window.mozIndexedDB || 
		window.OIndexedDB || 
		window.msIndexedDB;
		if(!indexedDB){

		}else{	
	// this.dbGenom = indexedDB.open("GENOM");
	// this.dbIssog = indexedDB.open("ISSOG");
}
}

function ab2str(buf) {
	return String.fromCharCode.apply(null, new Uint16Array(buf));
}

App.prototype  = {
	
	init: function (){
		$("#files").on("change", this.setFile.bind(this));
		$("#submit").on("click", this.compare.bind(this));

	},
	info: function (){
		// presents issog version etc.
	},
	update: function (){
		//will sync information. will need a serverside is to bee implemented. 
		// will work through extenssion 

	},
	setFile: function(evt) {
		var files = evt.target.files
		var app = this

		for(var i = 0; i < files.length; i++) {
			var item = files[i]
			var reader = new FileReader
			console.log("processing file..");
			reader.onload = function(evt) {
				app.rawInput = evt.target.result.split('\n')
				app.metadata = {
					filetype: item.type,
					name: item.name
				}
				//(app.metadata.item.type == "/.") ? app.db_fileparser(app) : app.genom_fileparser(app);
				
				switch (item.name.split('.').reverse()[0]) {
					case 'db23': app.markers_fileparser(app); break;
					case 'tree23': app.tree_fileparser(app); break;
					default: app.genom_fileparser(app);
				}
				console.log("is " + item.name.split('.').reverse()[0]);
			}
			reader.readAsText(item)
		}
		console.log("initiatzing parsing...");
	},//.bind(fileparser()),
	saveGenom: function (){
		console.log("Saving file to Genomdb")

	},

	saveGenom: function (){
		console.log("Saving file to Genomdb")

	},
	compare: function (){
		//compares genom file with database markers and returns array with possitive markers.
		// M176 client.js:113	
		// 002611 client.js:113	
		// M130
		setTimeout(this, 100);
		var progressbar = $('#progressbar');
		progressbar.prop('max',this.genInput.length-1);
		for (var i in this.genInput){ 
			progressbar.val(i);

			for (var ii in this.markInput ){
				if((this.genInput[i][0] === this.markInput[ii][3])){
					console.log(this.markInput[ii][0]);
					break;
				}
			}

		}
},


	genom_fileparser: function (app){
		//parsers blobs to database to bee compared.
		console.log("parseing..genom...");
		var rawTxt = app.rawInput;
		var i = 0;
		//23andMee file
		for(var i in rawTxt){
			(rawTxt[i][0] === '#') ? null : app.genInput.push(rawTxt[i].split('\t'));}
		//for testing purpose
		console.log(app.genInput);
	},
	markers_fileparser: function (app){
		//parsers blobs to database to bee compared.
		console.log("parseing..db..");
		var rawTxt = app.rawInput;
		var i = 0;
		//23andMee file
		for(var i in rawTxt){
			(rawTxt[i][0] === '#') ? null : app.markInput.push(rawTxt[i].split('\t'));}
		//for testing purpose

		console.log(app.markInput);
		
	},
	tree_fileparser: function (app){
		//parsers blobs to database to bee compared.
		console.log("parseing..tree..");
		var rawTxt = app.rawInput;
		var i = 0;
		//23andMee file
		for(var i in rawTxt){
			(rawTxt[i][0] === '#') ? null : app.markInput.push(rawTxt[i].split(' '));}
		//for testing purpose

		console.log(app.markInput);
		
	}
}

return App;

})();
