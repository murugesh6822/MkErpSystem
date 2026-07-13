import { NavLink } from 'react-router-dom';
import { FiGrid, FiUsers, FiBarChart2, FiSettings } from 'react-icons/fi';

const Sidebar = ({ open }) => {
  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: <FiGrid /> },
    { to: '/leads', label: 'Leads', icon: <FiUsers /> },

  ];

  return (
    <aside className={`sidebar bg-secondary text-white p-3 ${open ? 'open' : ''}`} style={{ width: '250px', minHeight: '100vh' }}>
      <div className="mb-4">
        <h4 className="fw-bold">ERP</h4>
        <p className="text-white-50 mb-0">Lead Management</p>
      </div>
      <nav className="d-flex flex-column gap-2">
        {links.map((link) => (
          <NavLink
            key={link.to + link.label}
            to={link.to}
            className={({ isActive }) => `nav-link rounded-3 px-3 py-2 d-flex align-items-center gap-2 ${isActive ? 'bg-primary' : 'text-white-50'}`}
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
