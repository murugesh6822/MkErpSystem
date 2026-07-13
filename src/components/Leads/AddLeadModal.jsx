import { useState } from 'react';
import { validateLead } from '../../utils/validators';
import { LEAD_STATUS_OPTIONS } from '../../utils/constants';

const AddLeadModal = ({ employees, onSave, onClose }) => {
  // Initialize with empty strings and the first status option as fallback default
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    status: LEAD_STATUS_OPTIONS[0] || '',
    assignedTo: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateLead(form);
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }
    
    // Inject fallback createdAt timestamp before handling save mutation
    onSave({
      ...form,
      createdAt: new Date().toISOString()
    });
  };

  return (
    <div className="modal d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.45)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Add New Lead</h5>
            <button className="btn-close" onClick={onClose} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body row g-3">
              <div className="col-md-6">
                <label className="form-label">Name</label>
                <input 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Mobile</label>
                <input 
                  name="mobile" 
                  value={form.mobile} 
                  onChange={handleChange} 
                  className={`form-control ${errors.mobile ? 'is-invalid' : ''}`} 
                />
                {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
              </div>
              <div className="col-12">
                <label className="form-label">Email</label>
                <input 
                  type="email"
                  name="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Status</label>
                <select 
                  name="status" 
                  value={form.status} 
                  onChange={handleChange} 
                  className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                >
                  {LEAD_STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                {errors.status && <div className="invalid-feedback">{errors.status}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Assigned Employee</label>
                <select 
                  name="assignedTo" 
                  value={form.assignedTo} 
                  onChange={handleChange} 
                  className={`form-select ${errors.assignedTo ? 'is-invalid' : ''}`}
                >
                  <option value="">Select Employee</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>{employee.name}</option>
                  ))}
                </select>
                {errors.assignedTo && <div className="invalid-feedback">{errors.assignedTo}</div>}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Lead</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLeadModal;
