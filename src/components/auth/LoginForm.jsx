import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import { loginUser } from '../../services/authService';
import { validateLogin } from '../../utils/validators';
import { useAuth } from '../../hooks/useAuth';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: 'admin@erp.com', password: 'admin123' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateLogin(form);
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }
    setSubmitting(true);
    setServerError('');
    try {
      const user = await loginUser(form);
      login(user);
      navigate('/dashboard');
    } catch (error) {
      setServerError(error.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 p-lg-5 shadow-sm">
      <div className="text-center mb-4">
        <h3 className="fw-bold">Welcome Back</h3>
        <p className="text-muted">Sign in to manage leads efficiently</p>
      </div>
      {serverError && <div className="alert alert-danger">{serverError}</div>}
      <div className="mb-3">
        <label className="form-label">Email Address</label>
        <div className="position-relative">
          <FiMail className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
          <input name="email" value={form.email} onChange={handleChange} className={`form-control ps-5 ${errors.email ? 'is-invalid' : ''}`} />
        </div>
        {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
      </div>
      <div className="mb-4">
        <label className="form-label">Password</label>
        <div className="position-relative">
          <FiLock className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
          <input type="password" name="password" value={form.password} onChange={handleChange} className={`form-control ps-5 ${errors.password ? 'is-invalid' : ''}`} />
        </div>
        {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
      </div>
      <button className="btn btn-primary w-100" disabled={submitting}>
        {submitting ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
};

export default LoginForm;
