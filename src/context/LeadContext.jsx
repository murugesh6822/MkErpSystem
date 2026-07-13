import { createContext, useEffect, useMemo, useState } from 'react';
import { deleteLead, deleteNote, fetchEmployees, fetchLeads, fetchNotes, saveLead, saveNote } from '../services/leadService';

export const LeadContext = createContext();

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [leadData, employeeData, noteData] = await Promise.all([
        fetchLeads(),
        fetchEmployees(),
        fetchNotes(),
      ]);
      setLeads(leadData);
      setEmployees(employeeData);
      setNotes(noteData);
      setError('');
    } catch (err) {
      setError('Unable to load lead data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateLead = async (lead) => {
    const updated = await saveLead(lead);
    setLeads(updated);
    setToast({ type: 'success', message: 'Lead updated successfully' });
    return updated;
  };

  const removeLead = async (leadId) => {
    const updated = await deleteLead(leadId);
    setLeads(updated);
    setToast({ type: 'success', message: 'Lead deleted successfully' });
    return updated;
  };

  const addNote = async (note) => {
    const updated = await saveNote(note);
    setNotes(updated);
    setToast({ type: 'success', message: 'Note added successfully' });
    return updated;
  };

  const removeNote = async (noteId) => {
    const updated = await deleteNote(noteId);
    setNotes(updated);
    setToast({ type: 'success', message: 'Note removed successfully' });
    return updated;
  };

  const value = useMemo(
    () => ({
      leads,
      employees,
      notes,
      loading,
      error,
      toast,
      setToast,
      loadData,
      updateLead,
      removeLead,
      addNote,
      removeNote,
    }),
    [leads, employees, notes, loading, error, toast]
  );

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
};
