from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_cors import CORS
from flask_mongoengine import MongoEngine
import json

app = Flask(__name__)
cors = CORS(app,resources={r"/api/*":{"origins":"*"}})
socketio = SocketIO(app, cors_allowed_origins="*")
app.debug = True
app.host = '0.0.0.0'

app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb+srv://admin:3voLCS1uj0QQ@nwhacksbar.vhrhz.mongodb.net/test?authSource=admin&replicaSet=atlas-dc8ozw-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
}

db = MongoEngine()
db.init_app(app)

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
    return render_template('index.html',**values)

# Handler for a message recieved over 'connect' channel
@socketio.on('connect')
def test_connect():
    print("Connected")
    emit('after connect',  {'data':'Lets dance'})

#This adds the users data to our database
@socketio.on('join')
def join_bar(data):
    user = Users(name=data['name'],
                age=data['age'])
    user.save()

@socketio.on('Wants Random Partner')
def begin__random_room(sid):
    join_room(sid, 'random1')

@socketio.on('Wants Specific Room')
def begin_specific_room(sid, room_name):
    join_room(sid, room_name)
    #this emits a message to everyone except the client who has just joined
    emit('joining', "new person has joined", room=room_name, skip_sid=sid)

@socketio.on('Leave Room')
def leave_a_room(sid, room_name):
    leave_room(sid, room_name)
    #this emits a message to everyone who is left in the room
    emit('joining', "person has left", room=room_name)

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