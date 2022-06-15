import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { SERVER_URL } from "./config";

const GoogleLogin = () => {
  const [user, setUser] = useState({});

  async function handleCallbackResponse(response) {
    const userObject = jwt_decode(response.credential);

    const url = SERVER_URL + "/user/login/google";
    await axios
      .post(url, {
        email: userObject.email,
        nickname: userObject.name,
        image_url: userObject.picture,
      })
      .then((res) => {
        setUser(res.data);
      });
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut() {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "1058679633962-bkib34e34p38kbtbmoiiploiup0i3ek5.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    }); // Sign In With Google

    google.accounts.id.prompt(); // One-tap sign-up
  }, []);

  return (
    <div>
      <div id="signInDiv"></div>
      {Object.keys(user).length != 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign out</button>
      )}

      {user && (
        <div>
          {/* <img src={user.picture}></img> */}
          <h3>{user.name}</h3>
        </div>
      )}
    </div>
  );
};

export default GoogleLogin;
