import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";

//import ReactDOM from 'react-dom';
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

const LOGIN = gql`
  mutation authenticate($email: String!, $password: String!) {
    authenticate(email: $email, password: $password) {
      _id
      token
    }
  }
`;

const UserLogin = () => {
  const history = useHistory();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading, error, data }] = useMutation(LOGIN);
  console.log(password);
  if (error) {
    return `Login Failed! ${error.message}`;
    history.push(`/login`);
  }
  if (data) {
    history.push(`/list`);
  }
  return (
    <>
      <div
        class="login"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <div>
          Student No : &nbsp;&nbsp;&nbsp;
          <input
            value={email}
            onChange={(event) => setemail(event.target.value)}
          />
          {/* Input box to input password */}
        </div>
        {/* Input box to input email */}
        <div>
          Password :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
      </div>
      {/* Button to log in */}
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          width: "fit-content",
        }}
      >
        <Button
          variant="primary"
          type="submit"
          onClick={() => login({ variables: { email, password } })}
        >
          Log in
        </Button>
      </div>
    </>
  );
};
export default UserLogin;
