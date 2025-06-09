import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FormPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '', lastName: '', username: '', email: '', password: '',
    phone: '', country: '', city: '', pan: '', aadhar: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const countries = {
    India: ['Mumbai', 'Delhi', 'Pune'],
    USA: ['New York', 'Chicago', 'Houston'],
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = 'First name is required';
    if (!form.lastName) newErrors.lastName = 'Last name is required';
    if (!form.username) newErrors.username = 'Username is required';
    if (!form.email.includes('@')) newErrors.email = 'Valid email required';
    if (!form.password) newErrors.password = 'Password is required';
    if (!form.phone.match(/^\+\d{1,3}\d{10}$/)) newErrors.phone = 'Use +91xxxxxxxxxx';
    if (!form.country) newErrors.country = 'Country is required';
    if (!form.city) newErrors.city = 'City is required';
    if (!form.pan.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)) newErrors.pan = 'Invalid PAN';
    if (!form.aadhar.match(/^\d{12}$/)) newErrors.aadhar = 'Aadhar must be 12 digits';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/success', { state: form });
    }
  };

  return (
    <div className="form-container">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        {['firstName', 'lastName', 'username', 'email', 'pan', 'aadhar'].map(field => (
          <div key={field}>
            <label>{field.replace(/([A-Z])/g, ' $1')}:</label>
            <input name={field} value={form[field]} onChange={handleChange} />
            <span className="error">{errors[field]}</span>
          </div>
        ))}

        <div>
          <label>Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
          <span className="error">{errors.password}</span>
        </div>

        <div>
          <label>Phone (+country code):</label>
          <input name="phone" value={form.phone} onChange={handleChange} />
          <span className="error">{errors.phone}</span>
        </div>

        <div>
          <label>Country:</label>
          <select name="country" value={form.country} onChange={handleChange}>
            <option value="">Select Country</option>
            {Object.keys(countries).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <span className="error">{errors.country}</span>
        </div>

        <div>
          <label>City:</label>
          <select name="city" value={form.city} onChange={handleChange}>
            <option value="">Select City</option>
            {(countries[form.country] || []).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <span className="error">{errors.city}</span>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormPage;
