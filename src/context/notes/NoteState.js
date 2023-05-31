import React, { useState } from "react";

import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const initialNotes = [
        {
            "_id": "647776b68153064a3170f505",
            "user": "647486f2388f3da0f50b3d49",
            "title": "About me",
            "description": "My name is Hamza and i am 18 years old.",
            "tag": "Personal",
            "date": "2023-05-31T16:32:54.500Z",
            "__v": 0
        },
        {
            "_id": "647776dd8153064a3170f507",
            "user": "647486f2388f3da0f50b3d49",
            "title": "Hello",
            "description": "My name is Hamza and I welcome you all in my village.",
            "tag": "Personal",
            "date": "2023-05-31T16:33:33.502Z",
            "__v": 0
        },
        {
            "_id": "6477773a8153064a3170f509",
            "user": "647486f2388f3da0f50b3d49",
            "title": "About Website",
            "description": "iNotebook is an website that help to save your personal notes on cloud. Your notes can only be accessed by you and no one can see your note without your permission.",
            "tag": "Business",
            "date": "2023-05-31T16:35:06.265Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(initialNotes)
    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;