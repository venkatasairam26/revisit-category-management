import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import "./index.css"

const Home = (props) => {
    const jwtToken = Cookies.get('jwt_token')
    const onClickLogOut = () => {
        Cookies.remove('jwt_token')
        props.history.replace("/signup");
    }
   
   if(jwtToken === undefined){
    return <Redirect to="/login" />;
   }
   return (
    <div>
        <nav className='nav-bar'>
            <p>Menu</p>
            <button onClick={onClickLogOut}>Logout</button>
        </nav>
    </div>
   )
}

export default Home