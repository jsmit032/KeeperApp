import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

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
      setClickedInput(true);
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
      {clickedInput ? <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        /> : null}
        {clickedInput ? <textarea
          name="content"
          onChange={handleChange}
          onClick={handleClick}
          value={note.content}
          placeholder="Take a note..."
          rows="3" 
        />: <textarea
          name="content"
          onChange={handleChange}
          onClick={handleClick}
          value={note.content}
          placeholder="Take a note..."
          rows="1" 
        />}
        {clickedInput ? <Zoom in={true}>
            <Fab onClick={submitNote}><AddIcon /></Fab>
        </Zoom> : null}
      </form>
    </div>
  );
}

export default CreateArea;
