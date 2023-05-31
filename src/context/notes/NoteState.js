import React, { useState } from "react";

import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const initialNotes = [
        {
            "_id": "6477764568153064a3170f505",
            "user": "647486f2388f3da0f50b3d49",
            "title": "About me",
            "description": "My name is Hamza and i am 18 years old.",
            "tag": "Personal",
            "date": "2023-05-31T16:32:54.500Z",
            "__v": 0
        },
        {
            "_id": "647776dd81530564a3170f507",
            "user": "647486f2388f3da0f50b3d49",
            "title": "Hello",
            "description": "My name is Hamza and I welcome you all in my village.",
            "tag": "Personal",
            "date": "2023-05-31T16:33:33.502Z",
            "__v": 0
        },
        {
            "_id": "6477773a81530464a3170f509",
            "user": "647486f2388f3da0f50b3d49",
            "title": "About Website",
            "description": "iNotebook is an website that help to save your personal notes on cloud. Your notes can only be accessed by you and no one can see your note without your permission.",
            "tag": "Business",
            "date": "2023-05-31T16:35:06.265Z",
            "__v": 0
        },
        {
            "_id": "6477746dd8153064a3170f507",
            "user": "647486f2388f3da0f50b3d49",
            "title": "Hello",
            "description": "My name is Hamza and I welcome you all in my village.",
            "tag": "Personal",
            "date": "2023-05-31T16:33:33.502Z",
            "__v": 0
        },
        {
            "_id": "6477773a8153064a31370f509",
            "user": "647486f2388f3da0f50b3d49",
            "title": "About Website",
            "description": "iNotebook is an website that help to save your personal notes on cloud. Your notes can only be accessed by you and no one can see your note without your permission.",
            "tag": "Business",
            "date": "2023-05-31T16:35:06.265Z",
            "__v": 0
        },
        {
            "_id": "647776dd815303464a3170f507",
            "user": "647486f2388f3da0f50b3d49",
            "title": "Hello",
            "description": "My name is Hamza and I welcome you all in my village.",
            "tag": "Personal",
            "date": "2023-05-31T16:33:33.502Z",
            "__v": 0
        },
        {
            "_id": "6477773a84153064a3170f509",
            "user": "647486f2388f3da0f50b3d49",
            "title": "About Website",
            "description": "iNotebook is an website that help to save your personal notes on cloud. Your notes can only be accessed by you and no one can see your note without your permission.",
            "tag": "Business",
            "date": "2023-05-31T16:35:06.265Z",
            "__v": 0
        },
        {
            "_id": "647776dd8153064a63170f507",
            "user": "647486f2388f3da0f50b3d49",
            "title": "Hello",
            "description": "My name is Hamza and I welcome you all in my village.",
            "tag": "Personal",
            "date": "2023-05-31T16:33:33.502Z",
            "__v": 0
        },
        {
            "_id": "6477773a81530764a3170f509",
            "user": "647486f2388f3da0f50b3d49",
            "title": "About Website",
            "description": "iNotebook is an website that help to save your personal notes on cloud. Your notes can only be accessed by you and no one can see your note without your permission.",
            "tag": "Business",
            "date": "2023-05-31T16:35:06.265Z",
            "__v": 0
        },
    ]
    const [notes, setNotes] = useState(initialNotes);

    // Add a Note
    const addNote = (title, description, tag) => {
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

    // Delete a Note
    const deleteNote = () => {

    }

    // Edit a Note
    const editNote = () => {

    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;