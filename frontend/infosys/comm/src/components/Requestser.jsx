import React, { useState } from 'react';
import axios from 'axios';
import '../components/Requestser.css';

const Requestser = () => {
  const [selectedService, setSelectedService] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [requests, setRequests] = useState([]);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleSendRequest = async () => {
    if (!selectedService || !address || !phone) {
      alert('Please fill in all required fields!');
      return;
    }

    const newRequest = {
      service: selectedService,
      address,
      phone,
      notes,
    };

    try {
      // Send request to a specific backend endpoint based on service type
      const response = await axios.post(`http://localhost:8080/request/${selectedService.toLowerCase()}`, newRequest, {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log('Request sent successfully:', response.data);

      setRequests([...requests, newRequest]); // Add new request to the list
      setSelectedService('');
      setAddress('');
      setPhone('');
      setNotes('');
    } catch (error) {
      console.error('Error sending request:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Request setup error:', error.message);
      }
      alert('Requested....');
    }
    
  };

  return (
    <div className="request-container">
      <h2>Request Services</h2>

      {/* Service Selection */}
      <h3>Select Service Type</h3>
      <div className="service-buttons">
        {['Water', 'House Keeping', 'Gas', 'Plumbing', 'Garbage Collection'].map((service) => (
          <button
            key={service}
            onClick={() => handleServiceSelect(service)}
            className={selectedService === service ? 'selected' : ''}
          >
            {service}
          </button>
        ))}
      </div>

      {/* Service Request Form */}
      <h3>Service Request Details</h3>
      <div className="request-form">
        <label>Address</label>
        <input type="text" placeholder="Enter your Address here" value={address} onChange={(e) => setAddress(e.target.value)} />

        <label>Phone No</label>
        <input type="text" placeholder="Enter your Phone No" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <label>Additional Notes</label>
        <textarea placeholder="Enter additional details (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />

        <button onClick={handleSendRequest}>Send Request</button>
      </div>

      {/* Display Submitted Requests */}
      {requests.length > 0 && (
        <div className="submitted-requests">
          <h3>Submitted Requests</h3>
          {requests.map((req, index) => (
            <div key={index} className="request-item">
              <p><strong>Service:</strong> {req.service}</p>
              <p><strong>Address:</strong> {req.address}</p>
              <p><strong>Phone:</strong> {req.phone}</p>
              {req.notes && <p><strong>Notes:</strong> {req.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Requestser;
