import { useMemo } from 'react';
import { formatDate } from '../../utils/dateFormatter';
import { useLeads } from '../../hooks/useLeads';
import AddNote from './AddNote';
import NotesList from './NotesList';

const LeadDetailsModal = ({ lead, onClose }) => {
  // 1. Destructure updateNote (or editNote depending on your hook implementation)
  const { employees, notes, addNote, removeNote, updateNote } = useLeads();

  if (!lead) return null;

  const employee = useMemo(
    () => employees.find((emp) => emp.id === lead.assignedTo),
    [employees, lead]
  );

  const leadNotes = useMemo(
    () => notes.filter((note) => String(note.leadId) === String(lead.id)),
    [notes, lead]
  );

  const handleAddNote = async (content) => {
    await addNote({
      leadId: lead.id,
      content,
      createdAt: new Date().toISOString(),
      createdBy: 'You',
    });
  };

  const handleDeleteNote = async (noteId) => {
    await removeNote(noteId);
  };

  // 2. Implement the handleEditNote function
  const handleEditNote = async (noteId, updatedContent) => {
    if (updateNote) {
      await updateNote(noteId, { content: updatedContent });
    }
  };

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">

            <div className="modal-header">
              <div>
                <h4 className="modal-title fw-bold">Lead Details</h4>
                <small className="text-muted">{lead.name}</small>
              </div>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">
              <div className="row g-4">

                {/* Lead Details */}
                <div className="col-lg-7">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <div className="row g-3">

                        <div className="col-md-6">
                          <strong>Name:</strong><br />
                          {lead.name}
                        </div>

                        <div className="col-md-6">
                          <strong>Mobile:</strong><br />
                          {lead.mobile}
                        </div>

                        <div className="col-md-6">
                          <strong>Email:</strong><br />
                          {lead.email}
                        </div>

                        <div className="col-md-6">
                          <strong>Address:</strong><br />
                          {lead.address}
                        </div>

                        <div className="col-md-6">
                          <strong>Course Interested:</strong><br />
                          {lead.courseInterested}
                        </div>

                        <div className="col-md-6">
                          <strong>Lead Source:</strong><br />
                          {lead.leadSource}
                        </div>

                        <div className="col-md-6">
                          <strong>Assigned Employee:</strong><br />
                          {employee?.name || 'Unassigned'}
                        </div>

                        <div className="col-md-6">
                          <strong>Created Date:</strong><br />
                          {formatDate(lead.createdAt)}
                        </div>

                        <div className="col-md-6">
                          <strong>Status:</strong><br />
                          <span className="badge bg-primary">
                            {lead.status}
                          </span>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="col-lg-5">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <h5 className="fw-bold mb-3">Notes</h5>

                      <AddNote onAdd={handleAddNote} />

                      <div className="mt-3">
                        {/* 3. Pass the new handler here */}
                        <NotesList
                          notes={leadNotes}
                          onEdit={handleEditNote}
                          onDelete={handleDeleteNote}
                        />
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default LeadDetailsModal;
