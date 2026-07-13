import NoteItem from './NoteItem';

const NotesList = ({ notes, onEdit, onDelete }) => {
  if (!notes.length) return <div className="text-muted">No notes yet.</div>;

  return (
    <div className="d-flex flex-column gap-2">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default NotesList;
