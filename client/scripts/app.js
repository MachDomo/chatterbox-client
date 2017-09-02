

// YOUR CODE HERE:

// http://parse.hrr.hackreactor.com/chatterbox/classes/messages
// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

let message = {
  username: 'Zack',
  text: 'Dom and Phillip are more awsomer!',
  roomname: 'lobby',
};
// Example:
// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
//   type: 'POST',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent');
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message', data);
//   }
// });
var ajaxObj = {
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
  type: 'GET',
  contentType: 'application/json',
  data: {'order': '-createdAt'},

  success: function (data) {
    console.log('chatterbox: Message recieved');
    console.log(data.results);
    for (let i = 0; i < 11; i++) {
      let newUser = `Username: ${data.results[i].username} `;
      // var $userLink = $('<section class="click"></section>');
      let newMessage = `Message: ${data.results[i].text}`;
      $('div#chats').append(document.createTextNode(newMessage));
    }
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to recieve message', data);
  }
};

let changeRooms = function(room) {
  //ajaxObj.data.keys = "roomname: "
};


let newMessages = $.ajax(ajaxObj);

let populateRooms = {
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
  type: 'GET',
  contentType: 'application/json',
  data: {'order': '-createdAt'},

  success: function (data) {
    let bucket = [];
    for (let i = 0; i < data.results.length; i++) {
      if (bucket.indexOf(data.results[i].roomname) === -1) {
        bucket.push(data.results[i].roomname);
      }
    }

    $.each(bucket, function(i, p) {
      $('.rooms').append($('<option></option').val(p).html(p));
    });
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to recieve message', data);
  }
};

$.ajax(populateRooms);


// document.createTextNode(string);

// $(document).ready(function(){

// });