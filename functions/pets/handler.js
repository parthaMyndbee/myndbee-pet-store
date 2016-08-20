'use strict';
console.log('Loading function');

let doc = require('dynamodb-doc');
let dynamo = new doc.DynamoDB();
let AWS = require('aws-sdk');
let cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});

module.exports.handler = (event, context, callback) => {
    console.log('Lambda Event object', event);
    console.log('Lambda context identity', JSON.stringify(context.identity));

    var params = {
      UserPoolId: 'us-east-1_48P4rvom0', /* required */
      sub: '663ebc77-5357-4d42-8b4d-8852472ad077' /* required */
    };
    cognitoidentityserviceprovider.adminGetUser(params, function(err, data) {
      if (err) console.log('Error ',err, err.stack); // an error occurred
      else     console.log('User data',data);           // successful response
      let payload = {
          "TableName": "pet",
          "ProjectionExpression": "userid,id,#t,#n",
          "ExpressionAttributeNames": {"#t": "type", "#n": "name"}
      };
      dynamo.scan(payload,callback);
    });


};
