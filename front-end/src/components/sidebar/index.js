import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'; 

const Sidebar = () => {
    return (
        <div className="sidebar">

            <nav className="nav-section">
                <ul>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/orders">Orders</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/categories">Categories</Link></li>
                    <li><Link to="/customers">Customers</Link></li>
                    <li><Link to="/reports">Reports</Link></li>
                    <li><Link to="/coupons">Coupons</Link></li>
                    <li><Link to="/inbox">Inbox</Link></li>
                </ul>
            </nav>

            <div className="other-section">
                <h4>Other Information</h4>
                <ul>
                    <li><Link to="/knowledge-base">Knowledge Base</Link></li>
                    <li><Link to="/product-updates">Product Updates</Link></li>
                </ul>
            </div>

            <div className="settings-section">
                <h4>Settings</h4>
                <ul>
                    <li><Link to="/personal-settings">Personal Settings</Link></li>
                    <li><Link to="/global-settings">Global Settings</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
