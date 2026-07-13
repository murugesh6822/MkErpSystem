const EmptyState = ({ title, description }) => (
  <div className="text-center py-5 border rounded-4 bg-white">
    <h5 className="mb-2">{title}</h5>
    <p className="text-muted mb-0">{description}</p>
  </div>
);

export default EmptyState;
