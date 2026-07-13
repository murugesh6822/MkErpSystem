import { useContext } from 'react';
import { LeadContext } from '../context/LeadContext';

export const useLeads = () => useContext(LeadContext);
