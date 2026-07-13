const Loader = ({ label = 'Loading...' }) => (
  <div className="d-flex flex-column align-items-center justify-content-center py-5">
    <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }} />
    <span className="mt-3 text-muted">{label}</span>
  </div>
);

export default Loader;
