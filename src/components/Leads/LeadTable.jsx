import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import { formatDate } from '../../utils/dateFormatter';
import { getInitials } from '../../utils/helpers';

const LeadTable = ({ leads, employees, onView, onEdit, onDelete }) => {
  const employeeMap = employees.reduce((acc, employee) => {
    acc[employee.id] = employee.name;
    return acc;
  }, {});

  const getStatusClass = (status) => {
    switch (status) {
      case 'Converted':
        return 'bg-success-subtle text-success';
      case 'Follow-Up':
        return 'bg-warning-subtle text-warning';
      case 'Closed Lost':
        return 'bg-danger-subtle text-danger';
      default:
        return 'bg-primary-subtle text-primary';
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>Lead Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Status</th>
            <th>Assigned</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                    {getInitials(lead.name)}
                  </div>
                  <div>
                    <strong>{lead.name}</strong>
                    <div className="small text-muted">{lead.courseInterested}</div>
                  </div>
                </div>
              </td>
              <td>{lead.mobile}</td>
              <td>{lead.email}</td>
              <td>
                <span className={`badge-status ${getStatusClass(lead.status)}`}>{lead.status}</span>
              </td>
              <td>{employeeMap[lead.assignedTo] || 'Unassigned'}</td>
              <td>{formatDate(lead.createdAt)}</td>
              <td>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => onView(lead)}>
                    <FiEye />
                  </button>
                  <button className="btn btn-sm btn-outline-warning" onClick={() => onEdit(lead)}>
                    <FiEdit />
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(lead)}>
                    <FiTrash2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;
