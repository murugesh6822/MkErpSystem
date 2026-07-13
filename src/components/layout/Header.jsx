import { useState } from 'react';
import { FiMenu, FiChevronDown, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

const Header = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="d-flex justify-content-between align-items-center p-3 bg-white border-bottom">
      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-light d-lg-none" onClick={onToggleSidebar}>
          <FiMenu />
        </button>
        <div>
          <h5 className="mb-0">ERP Lead Management</h5>
          <small className="text-muted">Operations dashboard</small>
        </div>
      </div>
      <div className="d-flex align-items-center gap-3">
        <div className="dropdown">
          <button className="btn btn-light d-flex align-items-center gap-2" onClick={() => setOpen((value) => !value)}>
            <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
              {user?.name?.split(' ').map((part) => part[0]).join('').slice(0, 2) || 'U'}
            </div>
            <span className="d-none d-md-inline">{user?.name}</span>
            <FiChevronDown />
          </button>
          {open && (
            <div className="dropdown-menu show position-absolute end-0 mt-2" style={{ minWidth: '180px' }}>
              <div className="dropdown-item-text">
                <strong>{user?.name}</strong>
                <div className="small text-muted">{user?.role}</div>
              </div>
              <button className="dropdown-item text-danger" onClick={logout}>
                <FiLogOut className="me-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
