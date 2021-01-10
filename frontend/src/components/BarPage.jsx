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
import { Redirect, useHistory } from "react-router-dom";
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
    fontFamily: "Courier New"
  },
  table: {
    minHeight: "100px",
    height: "50%",
    maxHeight: "200px",
    display: "flex",
    flexDirection: "column",
    width: "66%",
    minWidth: "100px",
    background: "	#481F01",
  },
  body: {
    display: "flex",
    flexDirection: "row",
    flex: "1 0 300px",
    justifyContent: "center",
  },
  eachTable: {
    display: "flex",
    flexDirection: "column",
    margin: "1.5%",
    justifyContent: "center",
  },
  participants: {
    display: "flex",
    justifyContent: "left",
    
  },
});
const BarPage = () => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [age, setAge] = useState();

  const history = useHistory();
  const userState = useUserState();

  const joinTable = (number) => {
    history.push(`/table/${number}`);
  };

  console.log(userState);
  if (!userState.name || !userState.age) {
    return <Redirect to="/" />;
  }

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
          <div className={classes.headerText}>Space Bar</div>
         
          <div className={classes.body}>
            {" "}
            
            {[...Array(6)].map((_, index) => (
              <Container className={classes.eachTable}>
              <Button className={classes.table} onClick={() => joinTable(index + 1)}>
                <div style={{ color: 'white' }}>Table {index + 1}</div>
              </Button>
              <Paper className={classes.participants}>
              Participants:
            </Paper>
              </Container>
            ))}
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default BarPage;
