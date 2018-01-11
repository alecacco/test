

database = [];

function findelement_indexed(key){
	for (var i = 0, len = database.length; i < len; i++) {
 		console.log(database[i]+" ? "+key);
 		if (database[i]['name'] == key){
			return {value:database[i], index:i}; 			
		}	
	}
	return undefined;
}

function findelement(key){
	elem = findelement_indexed(key);
	console.log(elem)
	if (elem == undefined){
		return undefined;
	} else {
		return elem.value;
	}
}

module.exports = {	
	getAllElements: function (){
		return database;
	},
	findElement: function (key){
		return findelement(key);
	},
	addElement: function (key,value){
		if (findelement(key) == undefined){
			database.push({'name':key,'nickname':value});
			return "OK"
		} else {
			return undefined;
		}
	},
	editElement:function(key,value){
		elem = findelement_indexed(key);
		if (elem.value == undefined){
			return undefined;
		} else {
			database[elem.index] = {name:key,nickname:value};
			return "OK";
		}
	},
	deleteElement:function(key){
		elem = findelement_indexed(key);
		if (elem.value == undefined){
			return undefined;
		} else {
			database.splice([elem.index],1);
			return "OK";
		}		
	}
}