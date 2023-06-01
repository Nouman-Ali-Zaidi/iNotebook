import React, { useState } from "react";

import NoteContext from "./NoteContext";


const NoteState = (props) => {
    const host = "http://localhost:5000";
    const initialNotes = [];
    const [notes, setNotes] = useState(initialNotes);

    // Fetch all Notes
    const fetchNotes = async () => {
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3NDg2ZjIzODhmM2RhMGY1MGIzZDQ5In0sImlhdCI6MTY4NTM1ODQ4MX0.DpAd6fevtm5DYKtorIiu7AGxw0ZysCIvt_HRbDBKQu8"
            }
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
        //  API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3NDg2ZjIzODhmM2RhMGY1MGIzZDQ5In0sImlhdCI6MTY4NTM1ODQ4MX0.DpAd6fevtm5DYKtorIiu7AGxw0ZysCIvt_HRbDBKQu8"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }

    //************  Delete a Note    ****************
    const deleteNote = async (id) => {
        //  API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3NDg2ZjIzODhmM2RhMGY1MGIzZDQ5In0sImlhdCI6MTY4NTM1ODQ4MX0.DpAd6fevtm5DYKtorIiu7AGxw0ZysCIvt_HRbDBKQu8"
            }
        });
        const json = await response.json();
        // Logic to delete a note
        console.log(json)
        const newNote = notes.filter((note) => note._id !== id);
        setNotes(newNote);
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        //  API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3NDg2ZjIzODhmM2RhMGY1MGIzZDQ5In0sImlhdCI6MTY4NTM1ODQ4MX0.DpAd6fevtm5DYKtorIiu7AGxw0ZysCIvt_HRbDBKQu8"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json)

        // Logic to edit in client
        // We can use both functionalities both work
        const newNotes = JSON.parse(JSON.stringify(notes));
        // const newNotes = notes.slice()
        for (let index = 0; index < notes.length; index++) {
            if (newNotes[index]._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;