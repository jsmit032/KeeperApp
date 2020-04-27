import React, { useState, useEffect } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

//import NoteDataService from '../services/note-service';

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });
  const [clickedInput, setClickedInput] = useState(false);

  useEffect(() => {
    if (props.editNote.isEditing === true) {
      setClickedInput(false);
      setNote({
        title: "",
        content: ""
      });
    }
  }, [props.editNote.isEditing]); 
  
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
    setClickedInput(true);
  }

  function updateNote(event) {
    setClickedInput(false);
    props.onEdit(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    setClickedInput(false);
    event.preventDefault();
  }


  return (
    <div>
      <form className="create-note">
      {props.editNote.isEditing ? <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder={props.editNote.title}
        /> : null || clickedInput ? <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        /> : null }
        <textarea
          name="content"
          onChange={handleChange}
          onClick={handleClick}
          value={ note.content }
          placeholder= { props.editNote.isEditing ? props.editNote.content : "Take a note..." }
          rows={clickedInput || props.editNote.isEditing ? 3 : 1} 
        />
        <Zoom in={clickedInput || props.editNote.isEditing}>
            <Fab onClick={ clickedInput ? submitNote : null ||
            props.editNote.isEditing ? updateNote : null}><AddIcon /></Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
