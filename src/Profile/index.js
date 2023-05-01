import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import jwt_decode from 'jwt-decode';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  const token = localStorage.getItem('jwtToken');


  // Decode JWT token to get the email
  const decodedToken = jwt_decode(token);
  const userEmail = decodedToken.sub;

  useEffect(() => {
    const fetchUser = async () => {
        
      setLoading(true);
      try {
        // Replace the URL with the endpoint of your user microservice
        const response = await axios.get(`http://localhost:49273/hub/user/get/${userEmail}`);
        setUser(response.data);
        setUpdatedUser(response.data); // Initialize the updatedUser state with the fetched data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchUser();
  }, [userEmail]);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUpdatedUser({
        ...updatedUser,
        photo: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
  
      // Use FormData to send the image and other user data
      const formData = new FormData();
      formData.append('fullName', updatedUser.fullName);
      formData.append('phone', updatedUser.phone);
      formData.append('description', updatedUser.description);
      if (updatedUser.photo) {
        formData.append('photo', updatedUser.photo);
      }
  
      // Replace the URL with the endpoint of your user microservice
      await axios.put(`http://localhost:49273/hub/user/update/${userEmail}`, formData, { headers });
      setUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };
  

  const handleChange = (event) => {
    setUpdatedUser({
      ...updatedUser,
      [event.target.name]: event.target.value,
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="profile">
      <div className="profile-picture">
      <img src={user.photo || 'https://via.placeholder.com/150'} alt="Profile" />
      </div>
      <h1>{user.fullName}</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Description: {user.description}</p>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            

            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={updatedUser.fullName || user.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              value={updatedUser.phone || user.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={updatedUser.description || user.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="photo">Profile Picture URL</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <button type="submit">Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
       
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}
    </div>
  );
};

export default Profile;
