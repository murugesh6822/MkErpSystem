import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiUsers, FiTarget, FiClock, FiCheckCircle } from 'react-icons/fi';
import DashboardLayout from '../../Components/layout/DashboardLayout';
import Loader from '../../Components/common/Loader';
import ErrorMessage from '../../Components/common/ErrorMessage';
import { useLeads } from '../../hooks/useLeads';
import { formatDate } from '../../utils/dateFormatter';

const Dashboard = () => {
  const { leads, employees, loading, error } = useLeads();

  const stats = useMemo(() => {
    return [
      { title: 'Total Leads', value: leads.length, icon: <FiUsers />, color: 'primary' },
      { title: 'New Leads', value: leads.filter((lead) => lead.status === 'New').length, icon: <FiTarget />, color: 'warning' },
      { title: 'Follow-up Leads', value: leads.filter((lead) => lead.status === 'Follow-Up').length, icon: <FiClock />, color: 'info' },
      { title: 'Converted Leads', value: leads.filter((lead) => lead.status === 'Converted').length, icon: <FiCheckCircle />, color: 'success' },
    ];
  }, [leads]);

  const recentLeads = useMemo(() => leads.slice(0, 5), [leads]);

  if (loading) return <DashboardLayout><Loader /></DashboardLayout>;
  if (error) return <DashboardLayout><ErrorMessage message={error} /></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Welcome back</h3>
          <p className="text-muted mb-0">A quick view of your lead pipeline.</p>
        </div>
        <Link to="/leads" className="btn btn-primary">
          Manage Leads <FiArrowRight className="ms-2" />
        </Link>
      </div>

      <div className="row g-4 mb-4">
        {stats.map((stat, index) => (
          <div className="col-md-6 col-xl-3" key={index}>
            <div className="card h-100 p-4 border-0">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="text-muted">{stat.title}</h6>
                  <h3 className="fw-bold mt-2">{stat.value}</h3>
                </div>
                <div className={`rounded-circle p-3 bg-${stat.color}-subtle text-${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Recent Leads</h5>
              <Link to="/leads" className="btn btn-sm btn-outline-primary">View All</Link>
            </div>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead) => (
                    <tr key={lead.id}>
                      <td>{lead.name}</td>
                      <td><span className="badge-status bg-primary-subtle text-primary">{lead.status}</span></td>
                      <td>{formatDate(lead.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card p-4">
            <h5 className="fw-bold mb-3">Team Members</h5>
            <div className="d-flex flex-column gap-2">
              {employees.slice(0, 6).map((employee) => (
                <div key={employee.id} className="d-flex justify-content-between align-items-center border rounded-3 p-2">
                  <span>{employee.name}</span>
                  <small className="text-muted">{employee.role}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
