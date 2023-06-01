import React, { useState } from "react";

import NoteContext from "./NoteContext";
import { json } from "react-router-dom";

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
            body: await JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        const note = {
            "_id": "6237773df0764354170f509",
            "user": "647486f2388f3da0f50b3d49",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-05-31T16:35:06.265Z",
            "__v": 0
        }
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
        // Login to delete a note
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
            body: JSON.stringify(title, description, tag)
        });
        const json = await response.json();

        // Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag
            }
        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;