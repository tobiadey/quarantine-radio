document.addEventListener('DOMContentLoaded', () => {
  var socket = io.connect('http://' + document.domain + ':' + location.port);

  let room;

  socket.on('connect', () => {
          socket.send("I am connected ");
      });

      // display incoming messages
        socket.on('message', data => {
          console.log( `Message received: ${data}`);
          const p = document.createElement('p');
          const span_username = document.createElement('span');
          const span_timestamp = document.createElement('span');
          const br = document.createElement('br');

          if (data.username){
            span_username.innerHTML = data.username;
            span_timestamp.innerHTML = data.time_stamp;
            p.innerHTML = span_username.outerHTML + br.outerHTML + data.msg + br.outerHTML
                          + span_timestamp.outerHTML;
            document.querySelector('#display-message-section').append(p);
            // document.querySelector('#display-message-section-mobile').append(p);

          } else {
            printSysMsg(data.msg);
          }

          scrollDownChatWindow();
        });

        socket.on('some-event', data => {
          console.log(data);
        });

        // send message
        document.querySelector('.send_message').onclick = () =>{
          socket.send({'msg': document.querySelector('.user_message').value,
                        'username': username, 'room':room});

         // clear input area (after sending essage)
         document.querySelector('.user_message').value = '';




          //   // testing
          // msg = `You are in room ${roomTitle}.`
          // console.log(msg)
        }

        //room selection
        document.querySelectorAll('.select-room').forEach( p => {
          p.onclick = () =>{

            let newRoom = room_id;
            if (newRoom ==  room){
              msg = `You are already in ${room} room.`
              printSysMsg(msg);
            } else{
              leaveRoom(room);
              joinRoom(newRoom);
              // playSong(newRoom);
              room = newRoom;
            }
          }

        });

        // //room selection
        // document.querySelectorAll('.select-song-room').forEach( p => {
        //   p.onclick = () =>{
        //
        //     let newRoom = room_id;
        //     if (newRoom ==  room){
        //       msg = `You are already in ${room} room.`
        //       printSysMsg(msg);
        //     } else{
        //       leaveRoom(room);
        //       joinRoom(newRoom);
        //       // playSong(newRoom);
        //       room = newRoom;
        //     }
        //   }
        //
        // });

        //room selection to leave
        document.querySelectorAll('.leave-room').forEach( p => {
          p.onclick = () =>{
            let room = room_id;
            leaveRoom(room);
            }


        });

        // Leave room
        function leaveRoom(room){
          socket.emit('leave', {'username': username, 'room': room, 'room_name':room_name});
        }

        // Join room
        function joinRoom(room){
          socket.emit('join',{'username': username, 'room': room, 'room_name':room_name});
          // clear message area
          document.querySelector('#display-message-section').innerHTML = ''
          // document.querySelector('#display-message-section-mobile').innerHTML = ''

          // auto focus on text box
          document.querySelector('.user_message').focus();


        }


        // // PlaySong
        // function PlaySong(room){
        //   socket.emit('play',{'username': username, 'song_name':song_name});
        // }


        // Scroll chat window down
          function scrollDownChatWindow() {
            const chatWindow = document.querySelector("#display-message-section");
            // const chatWindowMobile = document.querySelector("#display-message-section-mobile");
              chatWindow.scrollTop = chatWindow.scrollHeight;
          }


        // print system messages
        function printSysMsg(msg) {
          const p = document.createElement('p');
          p.innerHTML = msg;
          document.querySelector('#display-message-section').append(p);
          // document.querySelector('#display-message-section-mobile').append(p);

          }



          //  Spotify

})
