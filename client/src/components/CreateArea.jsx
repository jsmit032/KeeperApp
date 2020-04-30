import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

function CreateArea(props) {
  const blankNote = { title:"", content:"" };
  const [note, setNote] = useState(blankNote);
  const [clickedInput, setClickedInput] = useState(false);
  
  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function handleClick() {
    props.editNote.isEditing === true
      ? setClickedInput(false)
      : setClickedInput(true);
  }

  function updateNote(event) {
    setClickedInput(false);
    props.onEdit(note);
    setNote(blankNote);
    event.preventDefault();
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote(blankNote);
    setClickedInput(false);
    event.preventDefault();
  }

  function cancelInput() {
    if (props.editNote.isEditing === true) {
      props.onCancel();
      setNote(blankNote);
    } else if (clickedInput === true) {
      setNote(blankNote);
      setClickedInput(false);
    }
  }


  return (
    <div>
      <form className="create-note">
      {props.editNote.isEditing || clickedInput ? <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder={props.editNote.isEditing ? props.editNote.title : "Title"}
        /> : null }
        <textarea
          name="content"
          onChange={handleChange}
          onClick={handleClick}
          value={ note.content }
          placeholder= { props.editNote.isEditing ? props.editNote.content : "Take a note..." }
          rows={clickedInput || props.editNote.isEditing ? 3 : 1} 
        />
        <div className="submitInput">
          <Zoom in={clickedInput || props.editNote.isEditing}>
            <Fab onClick={ clickedInput ? submitNote : null ||
            props.editNote.isEditing ? updateNote : null}>
              <AddIcon />
            </Fab>
          </Zoom>
        </div>
        <div className="cancelInput">
          <Zoom in={clickedInput || props.editNote.isEditing}>
            <Fab onClick={cancelInput}>
              <CloseIcon />
            </Fab>
        </Zoom></div>
      </form>
    </div>
  );
}

export default CreateArea;
