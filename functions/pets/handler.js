'use strict';
console.log('Loading function');

let doc = require('dynamodb-doc');
let dynamo = new doc.DynamoDB();

module.exports.handler = (event, context, callback) => {
    let payload = {
        "TableName": "pet",
        "ProjectionExpression": "userid,id,#t,#n",
        "ExpressionAttributeNames": {"#t": "type", "#n": "name"}
    };
    dynamo.scan(payload,callback);
};
