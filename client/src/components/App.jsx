import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import NoteDataService from '../services/note-service';

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    // NoteDataService.create(newNote)
    //   .then(response => {
    //     setNotes(prevNotes => {
    //   //return [...prevNotes, newNote];
    //     }
    NoteDataService.create(newNote)
      .then(response => {
        console.log(response.newNote);
      })
      .catch(error => {
        console.log(error);
      });
    }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <Router>
      <div>
        <Header />
        <CreateArea onAdd={addNote} />
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
