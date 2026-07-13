import { useState } from 'react';

const AddNote = ({ onAdd }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onAdd(content.trim());
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
      <textarea className="form-control" rows="3" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Add a note..." />
      <button className="btn btn-primary align-self-start">Add Note</button>
    </form>
  );
};

export default AddNote;
