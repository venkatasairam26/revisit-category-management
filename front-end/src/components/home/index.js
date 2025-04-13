import { Navigate ,Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
import "./index.css"


const jwtToken = Cookies.get("jwt_token")




const Home = () => {
    console.log(jwtToken,"home token")
    // const navigate = useNavigate()
   if(jwtToken === undefined){
    return <Navigate to="/login" replace/>
   }
   return (
    <div>
        <nav className='nav-bar'>
            <p>Menu</p>
            <button onClick={() => {Cookies.remove('jwt_token', { path: '/' })}
}>Logout</button>
        </nav>
    </div>
   )
}

export default Home