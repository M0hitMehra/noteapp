import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NotesItem = (props) => {
  const context = useContext(noteContext);
  let { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className={`col-md-4  `}>
      <div className="notesitem bg-black text-dark card  my-3">
        <div className="card-body ">
          <h5 className={`card-title note_title `}> {note.title} </h5>
          <p className={`card-text note_description  `}>{note.description}</p>
          <i
            className="fa-solid fa-pen-to-square float-start "
            onClick={() => {
              updateNote(note);

            }}
          ></i>
          <i
            className="fa-solid fa-trash-can float-end  "
            onClick={() => {
              deleteNote(note._id);
              props.showAlert("Deleted", "danger");
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NotesItem;
