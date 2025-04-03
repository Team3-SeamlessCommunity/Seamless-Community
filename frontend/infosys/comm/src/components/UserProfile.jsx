import React, { useEffect, useState } from 'react';
import '../components/UserProfile.css';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('userProfile');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  if (!userData) return <p>Loading...</p>; // Handle case where data isn't available yet

  return (
    <div className='container'> 
      <div className='nameofres'>
        {userData.name} <br />
        <br />
        {userData.flatNo}
      </div>
      <div className='details'>
        <h3>INFORMATION</h3>
        <hr className='hrr'/>
        <div className='info'>
          <div className='leftside'>
            <p><strong>Society Name:</strong></p>{userData.societyName}
            <p><strong>Phone:</strong></p>{userData.phone}
          </div>
          <div className='rightside'>
            <p><strong>Name:</strong></p>{userData.name}
            <p><strong>Flat No:</strong></p>{userData.flatNo}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
