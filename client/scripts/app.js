

// YOUR CODE HERE:

// http://parse.hrr.hackreactor.com/chatterbox/classes/messages

let app = {
  username: '',
  data: {},
  server: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
  messages: [],
  friends: {},
  roomnames: {},
  settings: {'order': '-createdAt'},
  currentRoom: 'lobby',

  init: function() {

    // Event Triggers
    app.handleUsernameClick();
    app.handleSubmit();
    app.changeRooms();
    app.fetch();

    setInterval(app.fetch, 5000);

  },

  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
        app.fetch();
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  fetch: function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      data: app.settings,

      success: function (data) {
        console.log('chatterbox: Message recieved');
        if (app.messages[0] !== data.results[0].objectId) {
          app.data = data.results;
          app.renderMessages();
          app.renderRoom();
        } else {
          console.log('Nothing new to report!');
        }

      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message', data);
      }
    });
  },

  clearMessages: function() {
    $('div#chats').text('');
  },

  renderMessage: function(message) {
    let newMessage = `Message: ${message.text}`;
    //let createdAt = `Time: ${message.createdAt.slice(11, 19)}`;
    newMessage = $('<div class="messages"></div>').text(newMessage).fadeIn(1500);
    if (app.friends.hasOwnProperty(message.username)) {
      // make it bold and blue
      newMessage.css('font-weight', 'bold');
    }
    $('div#chats').append(newMessage);
  },

  renderMessages: function() {
    app.clearMessages();
    app.messages[0] = app.data[0].objectId;
    for (let i = 0; i < 11; i++) {
      app.renderUser(app.data[i]);
      app.renderMessage(app.data[i]);
      let createdAt = `Time: ${app.data[i].createdAt.slice(11, 19)}`;
      $('div#chats').append($('<div class="time"></div>').text(createdAt));
      // render time
    }
  },

  renderUser: function(message) {
    if (message.hasOwnProperty('username')) {
      username = message.username;
    } else {
      username = 'Anon';
    }
    let newUser = `Username: ${username}`;
    $('div#chats').append($('<div class="username"></div>').text(newUser));
  },



  renderRoom: function() {
    for (let i = 0; i < app.data.length; i++) {
      if (!(app.roomnames.hasOwnProperty(app.data[i].roomname))) {

        app.roomnames[app.data[i].roomname] = true;
        $('#roomSelect').append($('<option></option>').val(app.data[i].roomname).html(app.data[i].roomname));
      }
    }

  },

  handleUsernameClick: function() {
    $('#chats').on('click', '.username', function() {
      app.friends[$(this).text().slice(10)] = true;
      app.renderMessages();
    });
  },

  handleSubmit: function() {
    $('.submit').on('click', function() {
      event.preventDefault();

      let messageObj = {
        username: app.username,
        text: $('.message').val(),
        roomname: app.currentRoom,
      };
      console.log(messageObj);
      app.send(messageObj);
    });
  },

  changeRooms: function() {
    $('body').on('change', 'select', function() {
      app.settings.where = {'roomname': this.value};
      app.fetch();
      app.currentRoom = this.value;
    });
  },

  put: function(message, objectId) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server + '/' + objectId,
      type: 'PUT',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');

      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
        console.log(app.server + '/' + objectId);
      }
    });

  }
};

$(document).ready(function() {
  let username = window.location.search.split('&')[0].slice(10);
  app.username = username;
  app.init();

  $('input#hidden').val(app.username);

});