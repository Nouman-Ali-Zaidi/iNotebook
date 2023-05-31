import React, { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

const Home = () => {
    const context = useContext(noteContext);
    const { notes, setNotes } = context;
    return (
        <>
            <div className="container my-3">
                <h2>Add a Note</h2>

            </div>
            <div className="container my-3">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return (
                        <>
                            <h3>{note.title}</h3>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default Home;
