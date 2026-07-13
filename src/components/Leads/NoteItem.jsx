import { formatDateTime } from '../../utils/dateFormatter';

const NoteItem = ({ note, onEdit, onDelete }) => (
  <div className="border rounded-3 p-3 bg-white">
    <div className="d-flex justify-content-between align-items-start gap-2">
      <div>
        <p className="mb-1">{note.content}</p>
        <small className="text-muted">{note.createdBy} • {formatDateTime(note.createdAt)}</small>
      </div>
      <div className="d-flex gap-2">
        <button className="btn btn-sm btn-outline-warning" onClick={() => onEdit(note)}>
          Edit
        </button>
        <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(note.id)}>
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default NoteItem;
