import {
  Paper,
  Container,
  makeStyles,
  Button,
  TextField,
} from "@material-ui/core";
import LocalBarIcon from '@material-ui/icons/LocalBar';
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useUserState } from "./App";

import socket from "./Socket";

const useStyles = makeStyles({
  root: {
    background:
      "linear-gradient(180deg, #7F95D1 0%, rgba(255, 235, 231, 0.51) 100%)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Work Sans",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    flex: "1",
    alignItems: "center",
    flexDirection: "column",
  },
  headerText: {
    display: "flex",
    flex: "0 1 25%",
    textAlign: "center",
    fontSize: "clamp(20px, 10vw, 400px)",
    justifyContent: "center",
    fontFamily: "Copperplate",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    flex: "1 0 300px",
    width: "100%",
    alignItems: "center",
  },
  chat: {
    minHeight: "200px",
    height: "50%",
    maxHeight: "700px",
    display: "flex",
    flexDirection: "column",
    width: "66%",
    minWidth: "200px",
  },
  upper: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    border: "1px solid black",
    margin: "10px",
    borderRadius: 10,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  lower: {
    display: "flex",
    flexBasis: "50px",
    justifyContent: "center",
  },
  textField: {
    fontFamily: "Work Sans",
  },
});
const Table = (props) => {
  let params = useParams();
  let { id } = params;
  const classes = useStyles();

  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const userState = useUserState();

  useEffect(() => {
    if (!userState.name || !userState.age) {
      history.replace("/");
    }
    joinTable(id);
    socket.on("postMessage", (data) => {
      setMessages((messages) => [...messages, data]);
    });
    socket.on("joining", (data) => {
      console.log(data);
    });
  }, []);

  const joinTable = (number) => {
    socket.emit("joinRoom", { room: number, name: userState.name });
  };

  const history = useHistory();

  const leaveTable = () => {
    socket.emit("leaveRoom", { room: id, name: userState.name });
    history.push("/bar");
  };

  const sendMessage = () => {
    if (message === "") return;
    console.log("Message: ", message);
    socket.emit("chatMessage", {
      message: message,
      room: id,
      author: { name: userState.name, age: userState.age },
    });
    setMessage("");
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Container className={classes.root}>
        <Container className={classes.header}>
          <div className={classes.headerText}>Table {id} <div><LocalBarIcon fontSize='large'/></div></div>
          <div className={classes.body}>
            <p>Welcome to Table {id}!</p>
            <Paper className={classes.chat}>
              <div className={classes.upper}>
                {messages.map((m) => {
                  let { name, age } = m.author;
                  return (
                    <div>
                      {`${name}, ${age}`}: {m.message}
                    </div>
                  );
                })}
              </div>
              <div className={classes.lower}>
                <TextField
                  label="Chat"
                  className={classes.textField}
                  InputLabelProps={{ className: classes.textField }}
                  InputProps={{ className: classes.textField }}
                  value={message}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      console.log("SEND");
                      sendMessage();
                    }
                  }}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </Paper>
            <Button onClick={() => leaveTable()}>Leave Table</Button>
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default Table;
