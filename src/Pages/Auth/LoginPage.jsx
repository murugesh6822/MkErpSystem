import LoginForm from '../../Components/auth/LoginForm';

const LoginPage = () => (
  <div className="min-vh-100 d-flex align-items-center justify-content-center p-3" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)' }}>
    <div className="row w-100 justify-content-center">
      <div className="col-lg-5 col-md-8">
        <div className="card border-0 shadow-lg overflow-hidden">
          <div className="row g-0">
            <div className="col-md-5 bg-primary p-4 text-white d-flex flex-column justify-content-center">
              <h2 className="fw-bold">ERP</h2>
              <p className="mb-4">Lead Management Platform for modern sales teams.</p>
              <ul className="small">
                <li>Smart lead tracking</li>
                <li>Team collaboration</li>
                <li>Real-time workflow</li>
              </ul>
            </div>
            <div className="col-md-7 p-4 p-lg-5">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LoginPage;
