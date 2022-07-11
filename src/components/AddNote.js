import React,{useContext ,useState} from 'react'
import noteContext from '../context/notes/noteContext'

export const AddNote = (props) => {

  const [note ,setNotes] = useState({title: "" , description:"" , tag:""})

    const handleClick = (e) => {
      e.preventDefault()
      addNote(note.title , note.description , note.tag) 
      setNotes({title: "" , description:"" , tag:""}) 
      props.showAlert("Note Added" , "success") 
    }
    const onChange = (e) => {
      setNotes({...note , [e.target.name] : e.target.value})
    }

    const context = useContext(noteContext);
let {addNote} = context;

  return (
    <div className="container   my-4">
        <h2>Add Notes</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">title</label>
            <input type="text" className="form-control" id="title" name="title"  onChange = {onChange} value={note.title} aria-describedby="emailHelp" minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">description</label>
            <input type="text" className="form-control" onChange = {onChange} id="description" value={note.description}  name="description" minLength={5} required />
          </div>
         
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">tags</label>
            <input type="text" className="form-control" onChange = {onChange} id="tag"  value = {note.tag} name="tag"/>
          </div>


          <button  disabled = {note.title.length<5 || note.description.length<5}  type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
        </form>
      </div>
  )
}
