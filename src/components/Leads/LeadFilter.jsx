import { LEAD_STATUS_OPTIONS } from '../../utils/constants';

const LeadFilter = ({ filters, employees, onChange, onReset }) => {
  return (
    <div className="row g-3">
      <div className="col-md-3">
        <label className="form-label">Status</label>
        <select className="form-select" value={filters.status} onChange={(e) => onChange('status', e.target.value)}>
          <option value="">All Status</option>
          {LEAD_STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-3">
        <label className="form-label">Assigned Employee</label>
        <select className="form-select" value={filters.assignedTo} onChange={(e) => onChange('assignedTo', e.target.value)}>
          <option value="">All Employees</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-3">
        <label className="form-label">Start Date</label>
        <input type="date" className="form-control" value={filters.startDate} onChange={(e) => onChange('startDate', e.target.value)} />
      </div>
      <div className="col-md-3">
        <label className="form-label">End Date</label>
        <input type="date" className="form-control" value={filters.endDate} onChange={(e) => onChange('endDate', e.target.value)} />
      </div>
      <div className="col-12 d-flex justify-content-end">
        <button className="btn btn-outline-secondary" onClick={onReset}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default LeadFilter;
