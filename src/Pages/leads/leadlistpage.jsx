import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../Components/layout/DashboardLayout';
import Loader from '../../Components/common/Loader';
import ErrorMessage from '../../Components/common/ErrorMessage';
import EmptyState from '../../Components/common/EmptyState';
import Pagination from '../../Components/common/Pagination';
import LeadTable from '../../Components/leads/LeadTable';
import LeadSearch from '../../Components/leads/LeadSearch';
import LeadFilter from '../../Components/leads/LeadFilter';
import LeadDetailsModal from '../../Components/leads/LeadDetailsModal';
import EditLeadModal from '../../Components/leads/EditLeadModal';
import AddLeadModal from '../../Components/leads/AddLeadModal'; 
import ConfirmModal from '../../Components/common/ConfirmModal';
import { useLeads } from '../../hooks/useLeads';
import { usePagination } from '../../hooks/usePagination';
import { useDebounce } from '../../hooks/useDebounce';
import { PAGE_SIZE_OPTIONS } from '../../utils/constants';
import { FiPlus } from 'react-icons/fi'; // Imported the plus icon

const LeadListPage = () => {
  const navigate = useNavigate();
  const { leads, employees, loading, error, updateLead, removeLead, addLead, setToast } = useLeads(); 
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ status: '', assignedTo: '', startDate: '', endDate: '' });
  const [selectedLead, setSelectedLead] = useState(null);
  const [editingLead, setEditingLead] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); 
  const [deleteLeadId, setDeleteLeadId] = useState(null);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const debouncedSearch = useDebounce(search, 250);

  const filteredLeads = useMemo(() => {
    const searchValue = debouncedSearch.toLowerCase();
    return leads.filter((lead) => {
      const matchesSearch = !searchValue || [lead.name, lead.mobile, lead.email].some((value) => value.toLowerCase().includes(searchValue));
      const matchesStatus = !filters.status || lead.status === filters.status;
      const matchesEmployee = !filters.assignedTo || lead.assignedTo === Number(filters.assignedTo);
      const matchesStartDate = !filters.startDate || new Date(lead.createdAt) >= new Date(filters.startDate);
      const matchesEndDate = !filters.endDate || new Date(lead.createdAt) <= new Date(filters.endDate);
      return matchesSearch && matchesStatus && matchesEmployee && matchesStartDate && matchesEndDate;
    });
  }, [leads, debouncedSearch, filters]);

  const { currentPage, setCurrentPage, totalPages, pagedItems, resetPage } = usePagination(filteredLeads, pageSize);

  useEffect(() => {
    resetPage();
  }, [debouncedSearch, filters, pageSize]);

  const handleResetFilters = () => {
    setFilters({ status: '', assignedTo: '', startDate: '', endDate: '' });
    setSearch('');
  };

  const handleAddSave = async (newLeadData) => {
    if (addLead) {
      await addLead(newLeadData);
    }
    setIsAddModalOpen(false);
  };

  const handleEditSave = async (lead) => {
    await updateLead(lead);
    setEditingLead(null);
  };

  const handleDelete = async () => {
    if (!deleteLeadId) return;
    await removeLead(deleteLeadId);
    setDeleteLeadId(null);
  };

  const handleView = (lead) => setSelectedLead(lead);
  const handleEdit = (lead) => setEditingLead(lead);
  const handleDeleteClick = (lead) => setDeleteLeadId(lead.id);

  if (loading) return <DashboardLayout><Loader /></DashboardLayout>;
  if (error) return <DashboardLayout><ErrorMessage message={error} /></DashboardLayout>;

  return (
    <DashboardLayout>
      {/* Updated Header with Add Lead Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Lead Management</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><button className="btn btn-link p-0" onClick={() => navigate('/dashboard')}>Dashboard</button></li>
              <li className="breadcrumb-item active">Leads</li>
            </ol>
          </nav>
        </div>
        {/* Top-Right Add Lead Button */}
        <button 
          className="btn btn-primary d-flex align-items-center gap-2"
          onClick={() => setIsAddModalOpen(true)}
        >
          <FiPlus />
          <span>Add Lead</span>
        </button>
      </div>

      <div className="card p-4 mb-4">
        <div className="row g-3 align-items-end">
          <div className="col-lg-4">
            <LeadSearch value={search} onChange={(value) => { setSearch(value); setCurrentPage(1); }} />
          </div>
          <div className="col-lg-8">
            <LeadFilter filters={filters} employees={employees} onChange={(field, value) => { setFilters((prev) => ({ ...prev, [field]: value })); setCurrentPage(1); }} onReset={handleResetFilters} />
          </div>
        </div>
      </div>

      <div className="card p-4">
        {filteredLeads.length === 0 ? (
          <EmptyState title="No leads found" description="Try adjusting your search or filters." />
        ) : (
          <>
            <LeadTable 
              leads={pagedItems} 
              employees={employees} 
              onView={handleView} 
              onEdit={handleEdit} 
              onDelete={handleDeleteClick} 
              onAddLead={() => setIsAddModalOpen(true)} 
            />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} pageSize={pageSize} onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }} />
          </>
        )}
      </div>

      {isAddModalOpen && (
        <AddLeadModal 
          employees={employees} 
          onSave={handleAddSave} 
          onClose={() => setIsAddModalOpen(false)} 
        />
      )}

      {selectedLead && <LeadDetailsModal lead={selectedLead} onClose={() => setSelectedLead(null)} />}
      {editingLead && <EditLeadModal lead={editingLead} employees={employees} onSave={handleEditSave} onClose={() => setEditingLead(null)} />}
      <ConfirmModal show={Boolean(deleteLeadId)} title="Confirm Deletion" message="Are you sure you want to delete this lead?" onConfirm={handleDelete} onCancel={() => setDeleteLeadId(null)} />
    </DashboardLayout>
  );
};

export default LeadListPage;
