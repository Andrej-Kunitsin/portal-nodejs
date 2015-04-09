'use strict';

var _ = require('lodash');
var activiti = require('../../components/activiti');

var getFormByProcessDefinitionId = function(processDefinitionId, req, res) {
	var options = {
		path: 'form/form-data',
		query: {
			'processDefinitionId' : processDefinitionId,
		}
	};

	activiti.get(options, function(error, statusCode, result) {
		res.statusCode = statusCode;
		if (res.statusCode === 200) {
			req.session.lastFormProcessID = processDefinitionId;
		}
		res.send(result);
	});
}

exports.getLastFormProcess = function(req, res) {
	var processDefinitionId = req.session.lastFormProcessID 
		|| JSON.parse(req.cookies.lastFormProcessID);
	getFormByProcessDefinitionId(processDefinitionId, req, res);
}

// Get list of process-forms
exports.getFormByProcessDefinitionId = function(req, res) {
	var processDefinitionId = req.params.processDefinitionId;
	getFormByProcessDefinitionId(processDefinitionId, req, res);
};

/*
POST
{
  "processDefinitionId" : "5",
  "businessKey" : "myKey",
  "properties" : [
    {
      "id" : "room",
      "value" : "normal"
    }
  ]
}
*/
exports.submitForm = function(req, res) {
	var processDefinitionId = req.params.processDefinitionId;
	var options = {
		path: 'form/form-data'
	};
	activiti.post(options, req.body, function(error, statusCode, result) {
		res.statusCode = statusCode;
		res.send(result);
	});
}