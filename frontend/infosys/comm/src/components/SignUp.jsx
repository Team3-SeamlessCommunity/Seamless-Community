import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/SignUp.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const endpoint = formData.role === "admin" 
            ? 'http://localhost:8080/auth/admin/signup' 
            : 'http://localhost:8080/auth/resident/signup';
    
        try {
            const response = await axios.post(endpoint, formData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (response.status === 200) {
                alert("Signup successful! Please complete your profile.");
                navigate('/signup_first'); // First-time signup goes to signup_first
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("User already exists! Redirecting to login...");
                navigate('/login'); // If user exists, redirect to login
            } else {
                console.error("Signup Error:", error.response?.data || error.message);
                alert("Signup failed. Please try again.");
            }
        }
    };

    return (
        <div className='signup_section'>
            <div className='signup_img'>
                <img src="https://img.staticmb.com/mbcontent/images/uploads/2022/7/difference-between-flat-and-apartment.jpg" alt="" />
            </div>
            <div className='signup_form'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEPnJztpWSqZ8Mtwxyc-qAqT5fI-PG8dHWNQ&s" alt="" />
                <h3>Signup</h3>
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input type='email' name="email" value={formData.email} onChange={handleChange} required />

                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />

                    <label>Role</label>
                    <select name="role" value={formData.role} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="admin">Admin</option>
                        <option value="resident">Resident</option>
                    </select>

                    <button type="submit">Signup</button>
                </form>
                <p>Already have an account? <Link to="/login">Login here</Link></p> 
            </div>
        </div>
    );
};

export default SignUp;
