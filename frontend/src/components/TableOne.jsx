import {
    Paper,
    Container,
    makeStyles,
    Button,
    TextField,
  } from "@material-ui/core";
  import Cookies from "js-cookie";
  import { useEffect } from "react";
  import { useState } from "react";
  import { useHistory } from "react-router-dom";
  
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
    },
    body: {
      display: "flex",
      flexDirection: "column",
      flex: "1 0 300px",
    },
  });
  const TableOne = () => {
    const classes = useStyles();
  
    const [name, setName] = useState("");
    const [age, setAge] = useState();
  
    const history = useHistory();

    const leaveTable = () => {
        socket.emit("leaveRoom", {"room": "one", "name": name});
        history.push("/bar");
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
            <div className={classes.headerText}>Room 1</div>
            <div className={classes.body}>
              {" "}
              <p>Welcome to Room 1!</p>
              <Button
                onClick={() => leaveTable}
              >
                Leave Room
              </Button>
            </div>
          </Container>
        </Container>
      </div>
    );
  };
  
  export default TableOne;
  