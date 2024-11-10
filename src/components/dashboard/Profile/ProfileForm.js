import React, { useState } from 'react';
import axios from 'axios';

const ProfileForm = () => {
  const [profileData, setProfileData] = useState({
    phone_number: '',
    nationality: '',
    region: '',
    image: null,
    age: '',
    informed_by: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProfileData((prevData) => ({ ...prevData, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    // Prepare form data for multipart upload
    const formData = new FormData();
    for (const key in profileData) {
      formData.append(key, profileData[key]);
    }

    try {
      await axios.post('https://auth-django-85a2671276ca.herokuapp.com/profile/profiles/', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Profile saved successfully!');
    } catch (err) {
      setError('Failed to save profile: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="phone_number"
        value={profileData.phone_number}
        onChange={handleChange}
        placeholder="Phone Number"
      />
      <input
        type="text"
        name="nationality"
        value={profileData.nationality}
        onChange={handleChange}
        placeholder="Nationality"
      />
      <input
        type="text"
        name="region"
        value={profileData.region}
        onChange={handleChange}
        placeholder="Region"
      />
      <input
        type="file"
        name="image"
        onChange={handleFileChange}
      />
      <input
        type="number"
        name="age"
        value={profileData.age}
        onChange={handleChange}
        placeholder="Age"
      />
      <input
        type="text"
        name="informed_by"
        value={profileData.informed_by}
        onChange={handleChange}
        placeholder="Informed By"
      />
      <button type="submit">Save Profile</button>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </form>
  );
};

export default ProfileForm;
