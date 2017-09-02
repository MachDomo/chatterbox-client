

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
  objectID: 'yTZSfSPjQt'
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



let newMessages = $.ajax({
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
      let newMessage = `Message: ${data.results[i].text}`;

      $('div#chats').append(document.createTextNode(newMessage));
      $('div#chats').append(document.createTextNode(newMessage));
    }
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to recieve message', data);
  }
});

// document.createTextNode(string);