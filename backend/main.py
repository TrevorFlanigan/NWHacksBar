from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_cors import CORS
from flask_mongoengine import MongoEngine
import json

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")
app.debug = True
app.host = '0.0.0.0'

app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb+srv://admin:3voLCS1uj0QQ@nwhacksbar.vhrhz.mongodb.net/test?authSource=admin&replicaSet=atlas'
            '-dc8ozw-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
}

db = MongoEngine()
db.init_app(app)

table_clients = [[]]  # clients entered into list indexed by table number
standing_clients = []


class Users(db.Document):
    name = db.StringField()
    age = db.StringField()

    def to_json(self):
        return {"name": self.name,
                "age": self.age}


# Handler for default flask route
# Using jinja template to render html along with slider value as input
@app.route('/')
def index():
    return render_template('index.html', **values)


# Handler for a message recieved over 'connect' channel
@socketio.on('connect')
def test_connect():
    print("Connected")
    emit('after connect', {'data': 'Lets dance'})


# This adds the users data to our database
@socketio.on('join')
def join_bar(data):
    user = Users(name=data['name'],
                 age=data['age'])
    user.save()
    standing_clients.append({'username': user.name})


# Join a room
@socketio.on('joinRoom')
def join_specific_room(data):
    # join_room(sid, room_name)
    room = data['room']
    username = data['name']

    # storing name at table location in client array
    standing_clients.remove({'username': username})
    table_clients[room].append({'username': username})

    join_room(room)
    # send(username + ' has entered the room.', room=room)
    # this emits a message to everyone except the client who has just joined
    emit('joining', "new person has joined", room=room)
    emit('update', 'standing', standing_clients, 'tables', table_clients)


# Leave a room
@socketio.on('leaveRoom')
def leave_a_room(data):
    room = data['room']
    username = data['name']
    leave_room(room)

    # removes client from certain table
    standing_clients.append({'username': username})
    table_clients[room].remove({'username': username})

    # this emits a message to everyone who is left in the room
    # send(username + ' has left the room.', room=room)
    emit('leaveRoom', "person has left", room=room)
    emit('update', 'standing', standing_clients, 'tables', table_clients)


# Receive a message from the chat in a specific room
@socketio.on('chatMessage')
def send_into_chat(data):
    print(data["message"])
    print(data["room"])

    room = data['room']
    message = data['message']
    emit('postMessage', message, room=room)


@socketio.on('Wants Random Partner')
def begin__random_room(sid):
    join_room(sid, 'random1')


@socketio.on('hello')
def test_hello(data):
    print("hello")
    record = json.loads(data)
    user = Users(name=record['name'],
                 age=record['age'])
    user.save()


# Notice how socketio.run takes care of app instantiation as well.
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', use_reloader=True)
