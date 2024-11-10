import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const data = {
      email,
      password,
    };

    try {
      // const response = await axios.post('https://auth-django-85a2671276ca.herokuapp.com/auth/jwt/create/', data, {
        const response = await axios.post('http://127.0.0.1:8000/auth/jwt/create/', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Login Response:', response.data);
      localStorage.setItem('token', response.data.access);

      setSuccess('Login successful! Redirecting...');
      history.push('/blog');

    } catch (err) {
      console.error('Login Error:', err.response || err); // Logs the entire error response
      if (err.response && err.response.data) {
        setError(err.response.data.detail || 'Login failed');
      } else {
        setError('An error occurred: ' + err.message);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>User Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    backgroundColor: '#ffffff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '18px',
    cursor: 'pointer',
    textAlign: 'center',
  },
  error: {
    marginTop: '15px',
    padding: '10px',
    color: '#721c24',
    backgroundColor: '#f8d7da',
    borderRadius: '4px',
    textAlign: 'center',
  },
  success: {
    marginTop: '15px',
    padding: '10px',
    color: '#155724',
    backgroundColor: '#d4edda',
    borderRadius: '4px',
    textAlign: 'center',
  },
};

export default UserLogin;
