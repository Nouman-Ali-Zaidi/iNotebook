import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/NoteContext';

const AddNote = ({ showAlert }) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        showAlert("Note Added Successfully", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label" >Title</label>
                    <input type="text" className="form-control" id="title" name='title' required minLength={5} value={note.title} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name='description' rows="3" required minLength={5} value={note.description} onChange={onChange}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label" >Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' required minLength={5} value={note.tag} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
