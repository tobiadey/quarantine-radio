from time import localtime, strftime
from flask import (render_template, flash, redirect,
                    url_for, request, abort, Blueprint)
from flask_login import current_user, login_required
from quarantineradio import db
from quarantineradio.models import Room
from quarantineradio.rooms.forms import RoomForm,ChatForm
from quarantineradio import socketio
from flask_socketio import send, emit, join_room, leave_room




rooms =  Blueprint('rooms', __name__)
# room = Room.query.SelectorAll()

ROOMS = ["Lounge","News","Games","Code"]

@rooms.route('/room/new', methods=['POST','GET'])
@login_required
def post_new():
    form = RoomForm()
    if form.validate_on_submit():
        room = Room(title=form.title.data, description=form.description.data, room_creator=current_user)
        db.session.add(room)
        db.session.commit()
        flash('Post created!', 'success')
        return redirect(url_for('main.home'))
    return render_template('create_room.html', title='New Room', form=form, legend='New Room')

@rooms.route('/room/<int:room_id>')
@login_required
def room(room_id):
    room = Room.query.get_or_404(room_id)
    # print("prining message now")
    form = ChatForm()

    return render_template('room.html', title= room.title, room=room, form=form, username= current_user.username )

@rooms.route('/about')
def about():
    return render_template('tutabout.html', title='About')



# event buckets for SocketIO

@socketio.on('message')
def message(data):

    print(f"\n\n{data}\n\n")
    send(data)

    send({'msg':data['msg'], 'username':data['username'],'device_id':data['device_id'],'track_uri':data['track_uri'],
    'time_stamp':strftime('%b-%d %I:%M%p', localtime())}, room=data['room'])
    emit('some-event' , 'this is a custom event message')

@socketio.on('join')
def join(data):

    join_room(data['room'])
    send({'msg':data['username'] + " has joined " + data['room_name'] + " room."}, room=data['room'])

@socketio.on('leave')
def leave(data):

    leave_room(data['room'])
    send({'msg':data['username'] + " has left " + data['room_name'] + " room."}, room=data['room'])




# @socketio.on('play')
# def join(data):
#
#     send({'msg':data['username'] + " is currently playing " + data['song_name'] + "."})

@rooms.route('/chat', methods= ['GET','POST'])
def chat():
    return render_template('chat.html', username= current_user.username, rooms=ROOMS)





@rooms.route('/room/<int:room_id>/update', methods=['POST','GET'])
@login_required
def update_room(room_id):
    room = Room.query.get_or_404(room_id)
    if room.room_creator != current_user:
        abort(403)
    form = RoomForm()
    if form.validate_on_submit():
        room.title = form.title.data
        room.description = form.description.data
        db.session.commit()
        flash('your room has been updated','success')
        return redirect(url_for('rooms.room', room_id=room.id))
    elif request.method == 'GET':
        form.title.data = room.title
        form.description.data = room.description
    return render_template('create_room.html', title='Update Room', form=form, legend='Update Room')

@rooms.route('/room/<int:room_id>/delete', methods=['POST'])
@login_required
def delete_room(room_id):
    room = Room.query.get_or_404(room_id)
    if room.room_creator != current_user:
        abort(403)
    db.session.delete(room)
    db.session.commit( )
    flash('your room has been delted','success')
    return redirect(url_for('main.home'))



# @socketio.on('message')
# def handle_message(data):
#     print('received message: ')

# @socketio.on('my event')
# def handl_event(data):
#     log.info('Recieved data: %s'%(data))
#     emit('my response', data)
