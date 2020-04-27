import React, { useState } from "react";
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
    if (props.editNote.isEditing === true) {
      setClickedInput(false)
    } else {
      setClickedInput(true);
    }
  }

  function updateNote(event) {
    console.log("This is the update Submit");
    event.preventDefault();
  }

  function submitNote(event) {
    props.onAdd(note);
    console.log(props.onAdd(note));
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
          value={props.editNote.title}
          placeholder="Title"
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
          value={props.editNote.isEditing ? props.editNote.content : note.content}
          placeholder="Take a note..."
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

CreateArea.defaultProps = {
  editNote: false
}

export default CreateArea;
