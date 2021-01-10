from flask import Flask, render_template
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app,resources={r"/api/*":{"origins":"*"}})
socketio = SocketIO(app, cors_allowed_origins="*")
app.debug = True
app.host = '0.0.0.0'

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

@socketio.on('Wants Random Partner')
def begin__random_room(sid):
    join_room(sid, 'random1')

@socketio.on('Wants Specific Room')
def begin_specific_room(sid, room_name):
    join_room(sid, room_name)

@socketio.on('Leave Room')
def leave_a_room(sid, room_name):
    leave_room(sid, room_name)

@socketio.on('hello')
def test_hello():
    print("hello")

# Notice how socketio.run takes care of app instantiation as well.
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', use_reloader=True)