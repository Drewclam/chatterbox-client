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

var test = {
  name: '<div> boop </div><div> boop </div><div> boop </div><script>var fun = function() {[].forEach.call(document.querySelectorAll("*"),function(a){a.style.background="#"+(~~(Math.random()*(1<<24))).toString(16)})  }; setInterval(fun, 750);</script>',
  roomname: 'lobby',
  username: 'LOLOLOLO'
};

var app = {
  server: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
  init: function() {
    $(function() {

      $(`.chathistory`).click(function(e) {
        var clickedUser = e.target.classList[1];
        if (clickedUser) {
          app.clearMessages();
          app.handleUsernameClick(clickedUser);
        }
      });

      $('#send .submit').on('submit', app.handleSubmit());

      $('.postmessage').on('click', function() {
        var message = $('.userinput').val();
          app.send({
            username: 'magpie',
            text: message,
            roomname: 'lobby'
          });
      });

      $('#roomSelect').on('change', function()
        {
        app.clearMessages();
        // grab the changed room
        var changedRoom = $('#roomSelect').val();
        // invoke renderRoom to show the room
        app.renderRoom(changedRoom);
        // hide the current room
      });

      app.fetch();

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

    $.ajax({
      url: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        $('#roomSelect').html('');


        const uniqRoomNames = [...data.results].reduce((res, val) => {
          res[val.roomname] = res[val.roomname] + 1 || 1;
          return res;
        }, {});

        Object.keys(uniqRoomNames)
          .map(room => {
          return $('#roomSelect').append(`<option id="${room}">${room}</option>`);
        });

        [...data.results].map(result => {
          app.renderMessage(result);
        });
        app.container = [...data.results];

      },
      error: function(data) {
        console.log(data, 'error');
      }
    });
  },
  clearMessages: function() {
    $('.chathistory').html('');
  },
  renderMessage: function(message) {
    // $('#chats').append(`<div class="username">${message.username} ${message.text}</div>`);
    var currentRoom = $('#roomSelect').val();
    var username = `<div class="username ${message.username}">${message.username}</div>`;
    var msg = `<div class="message">${message.text}</div>`;
    // messages need to be grouped based on group name refactor our message
      // remove if statement.  We assign a message to a div based on its roomname
      // each div starts off with a hidden class
      // we then toggle the class if we select it from the dropdown
    if (message.roomname === currentRoom && this.friends[message.username]) {
      $('.chathistory').append(`<div class="messagewrapper friend" id="${message.roomname}">${username} ${msg}</div>`);
    } else {
      $('.chathistory').append(`<div class="messagewrapper" id="${message.roomname}">${username} ${msg}</div>`);
    }
  },
  renderRoom: function(roomName) {
    this.container.filter((messageObj) => roomName === messageObj.roomname).forEach(function(a) {app.renderMessage(a)});
  },
  handleUsernameClick: function(username) {
    // we push the clicked user into the friends list
    if (this.friends[username]) {
      delete this.friends[username];
    } else {
      this.friends[username] = true;
    }
    this.renderRoom('lobby');
  },
  handleSubmit: function() {
  },
  container: [],
  friends: {}
};

app.init();


    ////
    // !!!!!!!!!!!!!!!!OOOOOOOOR!!!!!!!!!!!! we can clear all messages whenever we change rooms by emptying the div .chathistory
    // then filter the fetch objects by current room name
    // renderRoom() then redraws .chathistory but populated by the filtered objects
    // also need to have fetching occuring on a settimeout to constantly receive the newest data ????
    /////
// BMR's
// Setup a way to refresh the displayed messages (either automatically or with a button)
// Allow users to select a user name for themself and to be able to send messages
// Allow users to 'befriend' other users by clicking on their user name
// Display all messages sent by friends in bold





