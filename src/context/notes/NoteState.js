import React, { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
  const host = "http://localhost:5000"
  
  const n1 = []

  const [notes, setNotes] = useState(n1);


  const getNotes = async (title, description, tags) => {
    //Api call
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
     method: 'GET', 
   
     headers: {
       'Content-Type': 'application/json',
       'auth-token':localStorage.getItem('token'),
      },
   });
   const json =   await response.json();
   
   
       setNotes(json)
   
     }


  const addNote = async (title, description, tags) => {
 //Api call
 const response = await fetch(`${host}/api/notes/addnotes/`, {
  method: 'POST', 

  headers: {
    'Content-Type': 'application/json',
    'auth-token':localStorage.getItem('token'),
  },
  body: JSON.stringify({title,description, tags}) 
});
const note = await  response.json();
    setNotes(notes.concat(note))

  }

  // Delete notes
  const deleteNote = async (id) => {

     //Api call
     const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: 'DELETE', 

      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token'),      },
    });
    

    const newNotes = notes.filter((note) => {
      return note._id !== id
    })
    const json =  await response.json();
    console.log(json)
    setNotes(newNotes);
  }

  //edit Note
  const editNote = async (id, title, description, tags) => {
    //Api call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT', 

      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token'),      },
      body: JSON.stringify({title, description, tags}) 
    });
    const json =  await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tags = tags;
        console.log(element)
        break;
      }
    }
    setNotes(newNotes)

  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote ,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState