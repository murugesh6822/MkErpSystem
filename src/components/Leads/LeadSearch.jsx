import SearchInput from '../common/SearchInput';

const LeadSearch = ({ value, onChange }) => (
  <div className="w-100">
    <SearchInput value={value} onChange={onChange} placeholder="Search by name, mobile or email" />
  </div>
);

export default LeadSearch;
