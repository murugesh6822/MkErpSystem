export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validateLogin = ({ email, password }) => {
  const errors = {};
  if (!email.trim()) errors.email = 'Email is required';
  else if (!validateEmail(email)) errors.email = 'Enter a valid email address';
  if (!password.trim()) errors.password = 'Password is required';
  return errors;
};

export const validateLead = (lead) => {
  const errors = {};
  if (!lead.name?.trim()) errors.name = 'Lead name is required';
  if (!lead.mobile?.trim()) errors.mobile = 'Mobile is required';
  if (!lead.email?.trim()) errors.email = 'Email is required';
  else if (!validateEmail(lead.email)) errors.email = 'Enter a valid email address';
  if (!lead.status) errors.status = 'Status is required';
  if (!lead.assignedTo) errors.assignedTo = 'Assigned employee is required';
  return errors;
};
