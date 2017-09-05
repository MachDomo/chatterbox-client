

// YOUR CODE HERE:

// http://parse.hrr.hackreactor.com/chatterbox/classes/messages


let app = {
  username: 'Phillip',
  data: {},
  server: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
  messages: [],
  friends: {},
  roomnames: {},
  settings: {'order': '-createdAt'},

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
      data: message,
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
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
        console.log(data.results);
        app.data = data.results;

        app.renderMessages();
        app.renderRoom();

        //   let newUser = `Username: ${username} `;
        //   let newMessage = `Message: ${data.results[i].text}`;
        //
        //   // Note: sanitize usernames
        //   $('div#chats').append($('<div class="usernames"></div>').text(newUser));
        //   $('div#chats').append($('<div class="messages"></div>').text(newMessage));
        //
        // }
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
    // var message = {
    // username: 'Mel Brooks',
    // text: 'Never underestimate the power of the Schwartz!',
    // roomname: 'lobby'
    // let username;



    let newMessage = `Message: ${message.text}`;
    //let createdAt = `Time: ${message.createdAt.slice(11, 19)}`;
    newMessage = $('<div class="messages"></div>').text(newMessage).fadeIn(1500);
    if (app.friends.hasOwnProperty(message.username)) {
      // make it bold and blue
      newMessage.css('font-weight', 'bold');
    }
    $('div#chats').append(newMessage);
    //$('div#chats').append($('<div class="time"></div>').text(createdAt));
  },

  renderMessages: function() {
    app.clearMessages();
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

    });
  },

  changeRooms: function() {
    $('body').on('change', 'select', function() {
      app.settings.where = {'roomname': this.value};
      app.fetch();
    });
  },
};

$(document).ready(function() {
  app.init();
});