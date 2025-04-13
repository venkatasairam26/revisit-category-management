import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie';


const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const setToken = (token) => {
        console.log(token, "token");
        Cookies.set("jwt_token", token, { expires: 30 });
        const { history } = props
        console.log(history.replace, "history")
        history.replace("/")

    };
    const registerNewUser = () => {
        props.history.replace("/signup")
    }


    //   console.log(username,password)
    // console.log(checkBtn, "checkBtn")

    const onSubmitForm = async (event) => {
        event.preventDefault();

        const url = "http://localhost:3000/login/"

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });


            const data = await response.json();
            console.log(data);
            setToken(data.jwtToken)

        } catch (error) {
            console.error("Error:", error);
            alert("Network Error: Unable to reach server");
        }
    };


    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>

            </form>
            <button type="button" onClick={registerNewUser}>Sign Up</button>
        </div>
    );
};

export default Login;
