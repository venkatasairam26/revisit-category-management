import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [checkBtn, setCheckBtn] = useState(false);
    const navigate = useNavigate();
    // const setToken = (token) => {
    //     console.log(token, "token")
    //  Cookies.set("jwt_token", token, {expires:30});
    //     // localStorage.setItem("jwt_token",token);
    //     navigate("/");
    // }

    const setToken = (token) => {
        console.log(token, "token");
        Cookies.set("jwt_token", token, { expires: 30 });
    
        setTimeout(() => {
            navigate("/");
        }, 1000); // slight delay to ensure cookie is set
    };
    

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


            const data = await response.json(); // Or .json() if backend returns JSON
            console.log(data);
            setToken(data.jwtToken)

        } catch (error) {
            console.error("Error:", error);
            alert("Network Error: Unable to reach server");
        }
    };

    // useEffect(() => {

    //     console.log("useffect Called")
    //     const url = "http://localhost:3000/login/"
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(url, {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //             });

    //             const data = await response.json();
    //             console.log(data);
    //         } catch (error) {
    //             console.error("Error:", error);
    //         }
    //     };
    //     fetchData();

       

 
    // }, [checkBtn]);


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
                    type="text" // ✅ corrected from "text"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>

            </form>
            <button type="button" onClick={() => {navigate("/signup")}}
                
            >Sign Up</button>
        </div>
    );
};

export default Login;
