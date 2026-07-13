import leadsData from '../data/leads.json';
import employeesData from '../data/employees.json';
import notesData from '../data/notes.json';
import { STORAGE_KEYS } from '../utils/constants';

const getStored = (key, fallback) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : fallback;
};

const setStored = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const fetchLeads = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = getStored(STORAGE_KEYS.leads, leadsData);
      resolve(stored);
    }, 400);
  });
};

export const fetchEmployees = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = getStored(STORAGE_KEYS.employees, employeesData);
      resolve(stored);
    }, 300);
  });
};

export const fetchNotes = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = getStored(STORAGE_KEYS.notes, notesData);
      resolve(stored);
    }, 300);
  });
};

export const saveLead = async (lead) => {
  const allLeads = getStored(STORAGE_KEYS.leads, leadsData);
  const existing = allLeads.find((item) => item.id === lead.id);
  let updated;
  if (existing) {
    updated = allLeads.map((item) => (item.id === lead.id ? { ...item, ...lead } : item));
  } else {
    updated = [{ ...lead, id: Date.now() }, ...allLeads];
  }
  setStored(STORAGE_KEYS.leads, updated);
  return updated;
};

export const deleteLead = async (leadId) => {
  const allLeads = getStored(STORAGE_KEYS.leads, leadsData);
  const updated = allLeads.filter((item) => item.id !== leadId);
  setStored(STORAGE_KEYS.leads, updated);
  return updated;
};

export const saveNote = async (note) => {
  const allNotes = getStored(STORAGE_KEYS.notes, notesData);
  const updated = note.id
    ? allNotes.map((item) => (item.id === note.id ? { ...item, ...note } : item))
    : [{ ...note, id: Date.now() }, ...allNotes];
  setStored(STORAGE_KEYS.notes, updated);
  return updated;
};

export const deleteNote = async (noteId) => {
  const allNotes = getStored(STORAGE_KEYS.notes, notesData);
  const updated = allNotes.filter((item) => item.id !== noteId);
  setStored(STORAGE_KEYS.notes, updated);
  return updated;
};
