import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/SignUp_first.css';

const SignUp_first = () => {
  const navigate = useNavigate();
  
  const [userDetails, setUserDetails] = useState({
    name: '',
    phone: '',
    societyName: '',
    role:'',
    flatNo: '',
    postal: ''
  });

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    localStorage.setItem('userProfile', JSON.stringify(userDetails)); // Save data
    navigate('/events'); // Redirect to profile page
  };

  return (
    <div className='signupf_section'> 
      <div className='signupf_img'>
        <img src="https://img.staticmb.com/mbcontent/images/uploads/2022/7/difference-between-flat-and-apartment.jpg" alt="" />
      </div>
      <div className='signupf_form'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEPnJztpWSqZ8Mtwxyc-qAqT5fI-PG8dHWNQ&s" alt="" />
        <h3>Fill Your Details !!</h3>
        <input type="text" placeholder='Name' id='name' value={userDetails.name} onChange={handleChange} required />
        <input type="number" placeholder='Phone No' id='phone' value={userDetails.phone} onChange={handleChange} required />
        <input type="text" placeholder='Society Name' id='societyName' value={userDetails.societyName} onChange={handleChange} />
        <input type="text" placeholder='Role' id='role' value={userDetails.role} onChange={handleChange} />
        <input type="text" placeholder='Flat No' id='flatNo' value={userDetails.flatNo} onChange={handleChange} />
        <input type='text' placeholder='Postal' id='postal' value={userDetails.postal} onChange={handleChange} />
        <button onClick={handleSubmit}>Add Details</button>
      </div>
    </div>
  );
};

export default SignUp_first;
