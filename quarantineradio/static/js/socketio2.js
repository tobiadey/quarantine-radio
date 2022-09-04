//send playing to other devices
document.addEventListener('DOMContentLoaded', () => {
  var socket = io.connect('http://' + document.domain + ':' + location.port);

  let room;


      socket.on('connect', () => {
          socket.send("Connected to play music 222 ");
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
                          + span_timestamp.outerHTML+ br.outerHTML + data.device_id;
            document.querySelector('#display-message-section-song').append(p);
            // document.querySelector('#display-message-section-mobile').append(p);

          } else {
            printSysMsg(data.msg);
          }

          scrollDownChatWindow();
        });

        socket.on('some-event', data => {
          console.log(data);
        });

        // // send message
        document.querySelector('.send_message-song').onclick = () =>{
          socket.send({'msg': document.querySelector('#current-track-name').innerHTML,
                        'username': username, 'room':room,
                        'device_id':document.querySelector('#current-device-id').innerHTML,
                        'track_uri':document.querySelector('#current-track-uri').innerHTML});

         // clear input area (after sending essage)
         // document.querySelector('.user_message-song').value = '';




            // testing
            if (username == 'testuser'){
              // device_id = data.device_id;
              // msg = `Hi  ${username} you are in control of the music room using ${device_id}.`
              printSysMsg(msg);
            }
        }

        // send message
        // socket.send({'msg': document.querySelector('#current-track-name').innerHTML,
        //                 'username': username, 'room':room});

         // clear input area (after sending essage)
         // document.querySelector('.user_message-song').value = '';




          //   // testing
          // msg = `You are in room ${roomTitle}.`
          // console.log(msg)


        // console.log( document.querySelector('#current-track-name').innerHTML);



        //room selection
        document.querySelectorAll('.select-room-song').forEach( p => {
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
        document.querySelectorAll('.leave-room-song').forEach( p => {
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
          document.querySelector('#display-message-section-song').innerHTML = ''
          // document.querySelector('#display-message-section-mobile').innerHTML = ''

          // auto focus on text box
          document.querySelector('.user_message-song').focus();


        }


        // // PlaySong
        // function PlaySong(room){
        //   socket.emit('play',{'username': username, 'song_name':song_name});
        // }


        // Scroll chat window down
          function scrollDownChatWindow() {
            const chatWindow = document.querySelector("#display-message-section-song");
            // const chatWindowMobile = document.querySelector("#display-message-section-mobile");
              chatWindow.scrollTop = chatWindow.scrollHeight;
          }


        // print system messages
        function printSysMsg(msg) {
          const p = document.createElement('p');
          p.innerHTML = msg;
          document.querySelector('#display-message-section-song').append(p);
          // document.querySelector('#display-message-section-mobile').append(p);

          }







      })
