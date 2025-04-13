import { useState,useEffect } from "react"
import { useNavigate } from 'react-router-dom';




const Signup = () =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate()
    console.log(username)
    console.log(password)
    console.log(email)
   const  onSubmitUserDetails = async (event)=>{
    event.preventDefault()
    const url = "http://localhost:3000/signup/"
    
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                email
            }),
        });


        const data = await response.text(); // Or .json() if backend returns JSON
        


        if (response.ok) {
            // alert(data);
            return navigate("/login")
        } else {
            alert(data);
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Network Error: Unable to reach server");
    }
   }

    return(
        <div className="signup">
            <h1>Signup</h1>
            <form onSubmit={onSubmitUserDetails}>
                <input type="text" placeholder="Username" required onChange={(e) => {setUsername(e.target.value)}} />
                <input type="email" placeholder="Email" required onChange={(e)=>{setEmail(e.target.value)}} />
                <input type="password" placeholder="Password" required onChange={(e)=>{setPassword(e.target.value)}} />
                <button type="submit">Signup</button>
            </form>
        </div>
    )
}

export default Signup