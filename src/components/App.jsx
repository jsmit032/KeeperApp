import React, { useState } from "react";
import Header from "./Heading";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
    
    const [notes, setNotes] = useState({
        title: "",
        content: ""
      });

    function addNote(inputObject, event) {
        console.log(inputObject);
        setNotes(prevNote => {
            return {...prevNote, inputObject};
        });
        event.preventDefault();
    }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {/* {notes.map((note, index)=> (
        <Note 
            key={index}
            id={index}
            title={note.title}
            content={note.content}
        />
      ))} */}
      <Footer />
    </div>
  );
}

export default App;
