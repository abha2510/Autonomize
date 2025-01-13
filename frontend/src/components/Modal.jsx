import React from 'react';
import "../styles/Modal.css";

const Modal = ({ isOpen, onClose, onSave, location, setLocation, blog, setBlog, bio, setBio }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Update User Information</h2>
                    <button className="modal-close-btn" onClick={onClose}>×</button>
                </div>
                
                <form className="modal-form">
                    <label>
                        Location:
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter location"
                        />
                    </label>
                    
                    <label>
                        Blog:
                        <input
                            type="text"
                            value={blog}
                            onChange={(e) => setBlog(e.target.value)}
                            placeholder="Enter blog URL"
                        />
                    </label>
                    
                    <label>
                        Bio:
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Enter bio"
                        />
                    </label>

                    <div className="modal-buttons">
                        <button className="modal-save-btn" onClick={onSave}>Save</button>
                        <button className="modal-cancel-btn" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
