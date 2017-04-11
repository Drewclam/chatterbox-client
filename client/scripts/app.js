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

// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

var app = {
  server: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
  init: function() {
    $(function() {

      $('.username').on('click', app.handleUsernameClick());
      $('#send .submit').on('submit', app.handleSubmit());
      $('.postmessage').on('click', function() {
        var message = $('.userinput').val();
          app.send({
            username: 'magpie',
            text: message,
            roomname: 'lobby'
          });
      });
      app.fetch();
      app.renderRoom();
    });
  },
  send: function(message) {
    $.ajax({
      url: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log(data, 'success');
      },
      error: function(data) {
        console.log(data, 'error');
      }
    });
  },
  fetch: function() {
    var serverMessages = $.ajax({
      url: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        app.renderRoom(data.results);

        [...data.results].map(result => {
          app.renderMessage(result);
        });
      },
      error: function(data) {
        console.log(data, 'error');
      }
    });
  },
  clearMessages: function() {
    $('#chats').html('');
  },
  renderMessage: function(message) {
    // $('#chats').append(`<div class="username">${message.username} ${message.text}</div>`);
    var currentRoom = $('#roomSelect').val();
    var username = '<div class="username">' + message.username + ' ' + '</div>';
    var msg = '<div class="message">' + message.text + '</div>';
    if (message.roomname === currentRoom) {
      $('.chathistory').append('<div class="messagewrapper">' + username + msg + '</div>');
    }
  },
  renderRoom: function(roomName) {

    const uniqRoomNames = [...roomName].reduce((res, val) => {
      res[val.roomname] = res[val.roomname] + 1 || 1;
      return res;
    }, {});

    return Object.keys(uniqRoomNames)
      .map(room => {
        return $('#roomSelect').append(`<option id="${room}">${room}</option>`);
      });

  },
  handleUsernameClick: function() {
    // add to friends
  },
  handleSubmit: function() {
  }
};


app.init();


