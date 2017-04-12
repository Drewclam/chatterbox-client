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
        // if (e.target.classList[1]) {
        //   for (var i = 0; i < e.target.classList[1].length; i++) {
        //     if (e.target.classList[1].charAt(i) === '\'' || e.target.classList[1].charAt(i) === '\"') {
        //       e.target.classList[1].charAt(i) = '';
        //     }
        //   }
        // }
        var clickedUser = e.target.classList[1];

        if (clickedUser) {
          console.log('you clicked on the username: ' , clickedUser);
          app.clearMessages();
          app.fetch();
          app.handleUsernameClick(clickedUser);
        }
      });


      $('.postmessage').on('click', function() {
        app.handleSubmit();
      });

      $('#roomSelect').on('change', function() {
        app.clearMessages();
        var changedRoom = `${$('#roomSelect').val()}`;
        app.currentChatRoom = `${$('#roomSelect').val()}`;
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
    $('.chathistory').html('');
  },
  renderMessage: function(message) {
    var username = `<div class="username ${message.username}">` + `${message.username}` + `</div>`;
    var msg = `<div class="message">` + encodeURI(message.text) + `</div>`;
    var roomname = `${message.roomname}`;

    if (roomname === app.currentChatRoom && this.friends[message.username]) {
      $('.chathistory').append(`<div class="messagewrapper friend" id="${roomname}">${username}: ${msg}</div>`);
    } else {
      $('.chathistory').append(`<div class="messagewrapper" id="${roomname}">${username}: ${msg}</div>`);
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
    this.renderRoom(app.currentChatRoom);
  },
  handleSubmit: function() {
    var sendThis = {};
    sendThis.username = encodeURI(window.location.search.split('').slice(10, this.length).join(''));
    sendThis.text = encodeURI($('.userinput').val());
    sendThis.roomname = encodeURI($('option').val());
    this.send(sendThis);
  },
  container: [],
  friends: {},
  currentChatRoom: 'lobby'
};

app.init();

setInterval(app.fetch, 2000);
