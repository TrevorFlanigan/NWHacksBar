from flask import Flask, render_template
from flask_socketio import SocketIO, emit
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

@socketio.on('hello')
def test_hello(data):
    print("hello")
    print(data)

# Notice how socketio.run takes care of app instantiation as well.
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', use_reloader=True)