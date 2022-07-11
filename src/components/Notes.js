import React, { useContext, useState , useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext'
import { AddNote } from './AddNote';
import NotesItem from './NotesItem'




const Notes = (props) => {
  const context = useContext(noteContext);
  let { notes, getNotes ,editNote} = context;
  let navigate = useNavigate();
  useEffect(() => {
   
    if(localStorage.getItem("token")){

      getNotes() 
    }else{
      navigate("/login");
    }
 // eslint-disable-next-line
  },[]);

  const ref = useRef(null);
const refClose = useRef(null);

  const updateNote = (Cnote) => {
    ref.current.click();
    setNotes({ id: Cnote._id , etitle : Cnote.title ,edescription:Cnote.description , etag:Cnote.tags});

  }
  
  const [note ,setNotes] = useState({id: "" ,etitle: "" , edescription:"" , etag:""})
  
  const handleClick = (e) => {
    refClose.current.click();
    editNote(note.id , note.etitle, note.edescription,note.etag)
    props.showAlert("Updated" , "success")
      
    }
    const onChange = (e) => {
      setNotes({...note , [e.target.name] : e.target.value})
    }

    

  return (
    <>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/*  */}
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" minLength={5} required onChange={onChange} value={note.etitle} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">description</label>
                  <input type="text" className="form-control" onChange={onChange} id="edescription" minLength={5} required value = {note.edescription} name="edescription" />
                </div>

                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">tags</label>
                  <input type="text" className="form-control" onChange={onChange} id="etag" name="etag" value = {note.etag} />
                </div>


              </form>
              {/*  */}
            </div>
            <div className="modal-footer">
              <button type="button" ref = {refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled = {note.etitle.length<5 || note.edescription.length<5} type="button"  className="btn btn-primary"  onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <AddNote showAlert = {props.showAlert} model = {props.mode}/>
      <div className=" row my-3">
        <h2>Your Notes</h2>
        <div className="container text-center">{notes.length===0 && "No Notes Available"}</div>
        {notes.map((note) => {
          return < NotesItem showAlert = {props.showAlert} key={note._id} mode = {props.mode} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes;