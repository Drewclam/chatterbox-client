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
        app.handleSubmit();
      });

      $('#roomSelect').on('change', function() {
        app.clearMessages();
        var changedRoom = `${$('#roomSelect').val()}`;
        app.renderRoom(changedRoom);
      });

      $('.changeNameBtn').click(function() {
        var newSearch = window.location.search = '';
        if (newSearch !== '' & newSearch !== '?') {
          newSearch += '&';
        }
        newSearch += 'username=' + (prompt('What is your name?') || 'anonymous');
        window.location.search = newSearch;
      });

      var userArray = window.location.search.split('');
      var slicedName = userArray.slice(10, userArray.length);
      $('.myName span').html(`<span> ${slicedName.join('')}</span>`);

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
      data: {
        order: '-createdAt'
      },
      success: function(data) {
        `${$('#roomSelect').html('')}`;


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
    `${$('.chathistory').html('')}`;
  },
  renderMessage: function(message) {
    var currentRoom = `${$('#roomSelect').val()}`;
    var username = `<div class="username ${message.username}">${message.username}</div>`;
    var msg = `<div class="message ${message}">${message.text}</div>`;

    if (message.roomname === currentRoom && this.friends[message.username]) {
      $('.chathistory').append(`<div class="messagewrapper friend" id="${message.roomname}">${username}: ${msg}</div>`);
    } else {
      $('.chathistory').append(`<div class="messagewrapper" id="${message.roomname}">${username}: ${msg}</div>`);
    }
  },
  renderRoom: function(roomName) {
    this.container.filter((messageObj) => roomName === messageObj.roomname).forEach(function(a) {`${app.renderMessage(a)}`});
  },
  handleUsernameClick: function(username) {
    if (this.friends[username]) {
      delete this.friends[username];
    } else {
      this.friends[username] = true;
    }
    `${this.renderRoom('lobby')}`;
  },
  handleSubmit: function() {
    var message = `${$('.userinput').val()}`;
    var backticked = `${message}`;
    `${app.send({
      username: 'magpie',
      text: backticked,
      roomname: 'lobby'
    })}`;
    `${$('.userinput').val('')}`;
  },
  container: [],
  friends: {}
};

app.init();

`${setInterval(app.fetch, 30000)}`;


