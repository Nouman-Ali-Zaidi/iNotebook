import React, { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const { title, description, _id } = props.note;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <div className='col-lg-3 col-md-4 col-sm-6'>
            <div className="card my-3">
                <div className="card-body ">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{title}</h5>
                        <div>
                            <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(_id) }}></i>
                            <i className="fa-solid fa-pen-to-square mx-2"></i>
                        </div>
                    </div>
                    <p className="card-text">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
