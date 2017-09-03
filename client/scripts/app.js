

// YOUR CODE HERE:

// http://parse.hrr.hackreactor.com/chatterbox/classes/messages
// var message = {
//   username: "'<script>let x=document.getElementsByTagName('body');x[0].style.background='repeating-linear-gradient(45deg, pink 0%, pink 20%, yellow 0%, yellow 50%) 0 / 55px 55px';</script>'",
//   text: "'<script>let x=document.getElementsByTagName('body');x[0].style.background='repeating-linear-gradient(45deg, pink 0%, pink 20%, yellow 0%, yellow 50%) 0 / 55px 55px';</script>'",
//   roomname: "'<script>let x=document.getElementsByTagName('body');x[0].style.background='repeating-linear-gradient(45deg, pink 0%, pink 20%, yellow 0%, yellow 50%) 0 / 55px 55px';</script>'"
// };
let app = {
  data: {},
  server: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
  messages: [],
  friends: {},

  init: function() {

    // Event Triggers
    $('#chats').on('click', '.username', function() {
      app.friends[$(this).text().slice(10)] = true;
    });

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
      data: {'order': '-createdAt'},

      success: function (data) {
        console.log('chatterbox: Message recieved');
        console.log(data.results);
        app.data = data.results;
        app.renderMessages();

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

    $('div#chats').append($('<div class="messages"></div>').text(newMessage));
    //$('div#chats').append($('<div class="time"></div>').text(createdAt));
  },

  renderMessages: function() {
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



  renderRoom: function(roomName) {
    $('#roomSelect').append($('<option></option>').text(roomName));
  },


};







// let changeRooms = function(room) {
//   ajaxObj.data.where = {'roomname': room};
//   $.ajax(ajaxObj);
// };




// let populateRooms = {
//   // This is the url you should use to communicate with the parse API server.
//   url: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
//   type: 'GET',
//   contentType: 'application/json',
//   data: {'order': '-createdAt'},

//   success: function (data) {
//     let bucket = [];
//     for (let i = 0; i < data.results.length; i++) {
//       if (bucket.indexOf(data.results[i].roomname) === -1) {
//         bucket.push(data.results[i].roomname);
//       }
//     }

//     $.each(bucket, function(i, p) {
//       //p = document.createTextNode(p);
//       $('.rooms').append($('<option></option').text(p));
//     });
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to recieve message', data);
//   }
// };

// $.ajax(populateRooms);


// // document.createTextNode(string);

// $(document).ready(function(){
//   $('.rooms').on('change', function(){
//     $('div#chats').text('');
//     changeRooms(this.value)
//   });
// });