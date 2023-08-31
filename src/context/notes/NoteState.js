import {useState} from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:3000";
    /*const s1 = {
        "name": "Neha",
        "class": "1"
    }
    const [state, setfirst] = useState(s1);
    const update = ()=>{
        setTimeout(()=>{
            setfirst({
                "name": "Neha Jadhav",
                "class": "11"
            })
        },1000);
    }*/
    const notesInitial = [];
    //Get all notes
    const getNotes = async () => {
        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);
        setnotes(json)
    }
    
    //Add note
    const addNote = async (title, description, tag) => {
        //Todo: API call
        //API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const note = await response.json();
        if(Array.isArray(notes)){
            setnotes([...notes,note]);
        }
    }
    
    //Delete note
    const deleteNote = async (id) => {
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);

        console.log("Deleting the note of id:" + id);
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setnotes(newNotes)
    }
    
    //Edit note
    const editNote = async (id, title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));
        //Logic to edit in client
        for(let index=0; index<newNotes.length; index++){
            const element = newNotes[index];
            if(element._id===id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setnotes(newNotes)
        console.log("Done")
    }
    
    const [notes, setnotes] = useState(notesInitial)

    return(
        <NoteContext.Provider value={{notes, getNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
        //value={{state,update}}
    )
}

export default NoteState;