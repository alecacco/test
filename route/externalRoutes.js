var DBMM = require("../database_simulation/db.js" );

function getAllElements(req,res){
	res.json(DBMM.getAllElements());
}

function findElement(req,res){
	result = DBMM.findElement(req.params.name);

	if (result == undefined){
		res.json({error:"element not found"});
	} else {
		res.json(result);
	}

}


function addElement(req,res){
	name = req.params.name;
	nickname = req.body.nickname;

	result = DBMM.addElement(name,nickname);

	if (result == undefined){
		res.json({error:"error adding element"});
	} else {
		res.json({msg:"element successfully added"});
	}
}

function editElement(req,res){
	name = req.params.name;
	nickname = req.body.nickname;

	result = DBMM.editElement(name,nickname);

	if (result == undefined){
		res.json({error:"error modifying element"});
	} else {
		res.json({msg:"element successfully modified"});
	}
}

function deleteElement(req,res){
	result = DBMM.deleteElement(name);

	if (result == undefined){
		res.json({error:"error deleting element"});
	} else {
		res.json({msg:"element successfully deleted"});
	}
}

exports.getAllElements = function(req,res){
	getAllElements(req,res);
}

exports.findElement = function (req, res){
	findElement(req,res);
}

exports.addElement = function (req, res){
	addElement(req,res);
}

exports.editElement = function (req, res){
	editElement(req,res);
}

exports.deleteElement = function (req, res){
	deleteElement(req,res);
}
