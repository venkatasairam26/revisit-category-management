import { Redirect, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import "./index.css"
import Sidebar from '../sidebar';

const Home = () => {
    const [categories, setCategories] = useState([]);
    console.log(categories)
    const jwtToken = Cookies.get('jwt_token')
    const history = useHistory()
    const onClickLogOut = () => {
        Cookies.remove('jwt_token')
        history.replace("/login");
    }
    useEffect(() => {
        const fetchCategories = async () => {
            const url = 'http://localhost:3000/categories';
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    if (jwtToken === undefined) {
        return <Redirect to="/login" />;
    }
    return (
        <div>
            <nav className='nav-bar'>
                <img src='https://res.cloudinary.com/dbbpvtoge/image/upload/v1744547199/fastcart-logo_xsnofi.png' alt="logo-img"/>
                <button onClick={onClickLogOut}>Logout</button>
            </nav>
            <div className='home-container'>
               <div className='sidebar-cont'> <Sidebar /></div>
                <div className='category-add-category'>
                    <button className='add-category'>Add Category</button>
                    <ul className='category-list'>
                        {categories.map((category) => (
                            <li key={category.id} className='category-item'>
                                <img src={category.category_img} alt={category.name} className='category-image' />
                                <p className='category-name'>{category.category_name}</p>
                                <p>{`${category.item_count} Items`}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home