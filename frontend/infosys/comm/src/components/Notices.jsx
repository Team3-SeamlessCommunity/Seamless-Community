import React, { useState } from 'react';
import '../components/Notices.css';

const Notices = () => {
  const [showInput, setShowInput] = useState(false);
  const [noticeText, setNoticeText] = useState('');
  const [notices, setNotices] = useState([]);

  const handleCreateNotice = () => {
    setShowInput(true);
  };

  const handleAddNotice = () => {
    if (noticeText.trim() !== '') {
      setNotices([...notices, noticeText]); // Add notice to state
      setNoticeText(''); // Clear input
      setShowInput(false); // Hide input box after adding
    }
  };

  return (
    <div className="notices-container">
      {/* Create Notice Button */}
      <div className="create_notice" onClick={handleCreateNotice}>
        + Create Notice
      </div>

      {/* Notice Input Box (Appears on Click) */}
      {showInput && (
        <div className="notice-input-box">
          <textarea
            placeholder="Enter notice description..."
            value={noticeText}
            onChange={(e) => setNoticeText(e.target.value)}
            className="notice-textarea"
          />
          <button className="add-notice-btn" onClick={handleAddNotice}>
            Add Notice
          </button>
        </div>
      )}

      {/* Display Notices */}
      <div className="notices-list">
        {notices.map((notice, index) => (
          <div key={index} className="notice-item">
            {notice}
          </div>
        ))}
      </div>
    </div>

  );
};

export default Notices;
