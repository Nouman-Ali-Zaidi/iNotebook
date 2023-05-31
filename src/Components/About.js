import React, { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

const About = () => {
    let a = useContext(noteContext);
    return (
        <div>
            <h1>{`Hello my name is ${a.name}`}</h1>
        </div>
    )
}

export default About
