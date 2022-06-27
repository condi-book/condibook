import React, { useEffect, useState, useContext } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { SERVER_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { DispatchContext } from "../App";
import styled from "styled-components";

const GoogleLogin = () => {
  const [user, setUser] = useState<any>({});
  const dispatch: any = useContext(DispatchContext);
  const navigate = useNavigate();
  // const signInDiv = document.getElementById("signInDiv") as HTMLDivElement;

  async function handleCallbackResponse(response: any) {
    const userObject: any = jwt_decode(response.credential);

    const url = SERVER_URL + "/user/login/google";
    await axios
      .post(url, {
        email: userObject.email,
        nickname: userObject.name,
        image_url: userObject.picture,
      })
      .then((res) => {
        setUser(res.data);
        const user = res.data;

        sessionStorage.setItem("userToken", user.token);
        sessionStorage.setItem("user", JSON.stringify(user));

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: user,
        });

        navigate("/bookmark");
      })
      .catch((error) => alert(error.message));

    // signInDiv.hidden = true;
  }

  function handleSignOut() {
    setUser({});
    // signInDiv.hidden = false;
  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:
        "1058679633962-bkib34e34p38kbtbmoiiploiup0i3ek5.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "outline",
        size: "large",
      },
    ); // Sign In With Google

    window.google.accounts.id.prompt(); // One-tap sign-up
  }, []);

  return (
    <ButtonDiv>
      <div id="signInDiv"></div>
      {Object.keys(user).length != 0 && (
        <button onClick={() => handleSignOut()}>Sign out</button>
      )}
    </ButtonDiv>
  );
};

const ButtonDiv = styled.div`
  iframe {
    width: 100% !important;
    margin: 0 !important;
  }

  #container {
    width: 100% !important;
    padding: 0 !important;
  }
`;

export default GoogleLogin;
