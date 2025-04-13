import { useState } from "react";
import './index.css';

const Signup = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const onSubmitUserDetails = async (event) => {
        event.preventDefault();
        const url = "http://localhost:3000/signup/";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                    email,
                }),
            });

            const data = await response.text();

            if (response.ok) {
                setSuccessMessage("Signup successful! Redirecting to login...");
                setTimeout(() => {
                    props.history.replace("/login");
                }, 2000); 
            } else {
                alert(data);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Network Error: Unable to reach server");
        }
    };

    return (
        <div className="signup">
            <form onSubmit={onSubmitUserDetails}>
                <h1>Signup</h1>
                <input
                    type="text"
                    placeholder="Username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Signup</button>

                {successMessage && (
                    <p className="success-message">{successMessage}</p>
                )}
            </form>
        </div>
    );
};

export default Signup;
