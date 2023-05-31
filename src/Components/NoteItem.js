import React from 'react';

const NoteItem = (props) => {
    const { title, description } = props.note;
    return (
        <div className='col-lg-3 col-md-4 col-sm-6'>
            <div className="card my-3">
                <div className="card-body ">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{title}</h5>
                        <div>
                            <i className="fa-solid fa-trash mx-2"></i>
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
