from flask_sqlalchemy import SQLAlchemy
from flask import Flask

db = SQLAlchemy()

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, world!"


if __name__ == "__main__":
    app.run(host="localhost", port=8000, debug=True)
