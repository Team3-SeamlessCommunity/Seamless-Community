import React, { useState, useEffect } from 'react';
import './Complaints.css';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [formData, setFormData] = useState({ name: '', title: '', description: '' });
  const [userData, setUserData] = useState(null);

  // Load complaints and user data from localStorage when the component mounts
  useEffect(() => {
    const storedComplaints = JSON.parse(localStorage.getItem('complaints')) || [];
    setComplaints(storedComplaints);

    // Fetch user role from localStorage
    const storedUser = JSON.parse(localStorage.getItem('userProfile'));
    setUserData(storedUser);
  }, []);

  // Function to update localStorage and state
  const updateComplaints = (updatedComplaints) => {
    localStorage.setItem('complaints', JSON.stringify(updatedComplaints));
    setComplaints(updatedComplaints);
  };

  // Handle complaint submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new complaint with default "unsolved" status
    const newComplaint = { 
      id: Date.now(),  // Unique ID for deletion
      name: formData.name, 
      title: formData.title, 
      description: formData.description, 
      status: 'unsolved' 
    };

    // Update local storage and state
    const updatedComplaints = [...complaints, newComplaint];
    updateComplaints(updatedComplaints);

    // Reset form fields
    setFormData({ name: '', title: '', description: '' });
    alert("Complaint Submitted! It will be resolved.");
  };

  // Handle complaint resolution (Admin only)
  const markAsSolved = (complaintId) => {
    const updatedComplaints = complaints.map((c) => 
      c.id === complaintId ? { ...c, status: 'solved' } : c
    );
    updateComplaints(updatedComplaints);
  };

  // Handle complaint deletion (Admin only)
  const deleteComplaint = (complaintId) => {
    const updatedComplaints = complaints.filter((c) => c.id !== complaintId);
    updateComplaints(updatedComplaints);
  };

  // Count total, solved, and unsolved complaints
  const totalComplaints = complaints.length;
  const solvedComplaints = complaints.filter(c => c.status === 'solved').length;
  const unsolvedComplaints = totalComplaints - solvedComplaints;

  return (
    <div className="complaints-container">
      {/* Complaint Summary */}
      <div className="complaint-summary">
        <div className="summary-box">Total Complaints: {totalComplaints}</div>
        <div className="summary-box solved">Solved: {solvedComplaints}</div>
        <div className="summary-box unsolved">Unsolved: {unsolvedComplaints}</div>
      </div>

      {/* Complaint Form (Visible to all users) */}
      <div className="complaint-form">
        <h2>Submit a Complaint</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input 
            type="text" 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
            required 
          />

          <label>Title</label>
          <input 
            type="text" 
            value={formData.title} 
            onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
            required 
          />

          <label>Description</label>
          <textarea 
            value={formData.description} 
            onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
            required 
          ></textarea>

          <button type="submit">Submit Complaint</button>
        </form>
      </div>

      {/* Complaint List */}
      <div className="complaint-list">
        <h2>Complaints</h2>
        {complaints.length > 0 ? (
          complaints.map((complaint) => (
            <div key={complaint.id} className={`complaint-item ${complaint.status}`}>
              <h3>{complaint.title}</h3>
              <p><strong>Name:</strong> {complaint.name}</p>
              <p><strong>Description:</strong> {complaint.description}</p>
              <p><strong>Status:</strong> {complaint.status}</p>

              {/* Show Solve & Delete options only for Admins */}
              {userData?.role === "admin" && (
                <>
                  {complaint.status === "unsolved" && (
                    <button className="solve-btn" onClick={() => markAsSolved(complaint.id)}>
                      Mark as Solved
                    </button>
                  )}
                  <button className="delete-btn" onClick={() => deleteComplaint(complaint.id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No complaints yet.</p>
        )}
      </div>
    </div>
  );
};

export default Complaints;
