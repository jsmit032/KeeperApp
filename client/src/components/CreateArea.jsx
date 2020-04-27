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
    console.log(props);
  }, []);

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

  // function updateNote(event) {
  //   // called once '+' is clicked to update Note
  //   event.preventDefault();
  // }

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
      {clickedInput ? <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        /> : null}
        <textarea
          name="content"
          onChange={handleChange}
          onClick={handleClick}
          value={note.content}
          placeholder="Take a note..."
          rows={clickedInput ? 3 : 1} 
        />
        <Zoom in={clickedInput}>
            <Fab onClick={ submitNote }><AddIcon /></Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
