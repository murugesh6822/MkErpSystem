import { FiSearch } from 'react-icons/fi';

const SearchInput = ({ value, onChange, placeholder = 'Search...' }) => (
  <div className="position-relative">
    <FiSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
    <input
      type="text"
      className="form-control ps-5"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

export default SearchInput;
