from flask_sqlalchemy import SQLAlchemy
from flask import Flask, request, jsonify
from flask_mongoengine import MongoEngine
import json

#db = SQLAlchemy()

app = Flask(__name__)

app.config['MONGODB_SETTINGS'] = {
    #'db': 'your_database',
    'host': 'mongodb+srv://admin:3voLCS1uj0QQ@nwhacksbar.vhrhz.mongodb.net/test?authSource=admin&replicaSet=atlas-dc8ozw-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
    #'port': 27017
}

db = MongoEngine()
db.init_app(app)

class Users(db.Document):
    name = db.StringField()
    age = db.StringField()
    def to_json(self):
        return {"name": self.name,
                "age": self.age}

@app.route("/")
def home():
    return "Hello, world!"

@app.route('/user/create', methods=['PUT'])
def create_user():
    record = json.loads(request.data)
    user = Users(name=record['name'],
                age=record['age'])
    user.save()
    return jsonify(user.to_json())

@app.route('/user/info', methods=['GET'])
def get_user_info():
    name = request.args.get('name')
    user = Users.objects(name=name).first()
    if not user:
        return jsonify({'error': 'data not found'})
    else:
        return jsonify(user.to_json())



if __name__ == "__main__":
    app.run(host="localhost", port=8000, debug=True)
