// headers: {
//         'Authorization':'Basic xxxxxxxxxxxxx',
//         'X_CSRF_TOKEN':'xxxxxxxxxxxxxxxxxxxx',
//         'Content-Type':'application/json'
//     },
// beforeSend: function(request) {
  //   request.setRequestHeader("Authority", authorizationToken);
  // },


//   Request Format

// For POST and PUT requests, the request body must be JSON, with the Content-Type header set to application/json.

// Authentication is done via HTTP headers. The X-Parse-Application-Id header identifies which application you are accessing, and the X-Parse-REST-API-Key header authenticates the endpoint.

// In the examples that follow, the keys for your app are included in the command. You can use the drop-down to construct example code for other apps.

// You may also authenticate your REST API requests using basic HTTP authentication. For example, to retrieve an object you could set the URL using your Parse credentials in the following format:

//https://myAppID:javascript-key=myJavaScriptKey@api.parse.com/1/classes/GameScore/Ed1nuqPvcm

var app = {
  init: function() {

  },
  send: function(message) {
    $.ajax({
      url: 'http://parse.hrr23.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      headers: {
        // 'X-Parse-Application-Id':
      },
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log('success');
      },
      error: function(data) {
        console.log(data, 'error');
      }
    });
  },
  fetch: function() {

  }
};

  // $('.postmessage').on('click', function() {
  // });

