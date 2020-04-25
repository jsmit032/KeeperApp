import React, { useState, useEffect } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import NoteDataService from '../services/note-service';
import LoadingSpinner from '../components/UIElements/LoadingSpinner';

import '../components/App.css';


function App() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const displayNotes = async () => {
    setIsLoading(true);
    try {
      const response = await NoteDataService.getAll();
      const responseData = await response.data;

      setNotes(responseData.notes);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    displayNotes();
  }, []);

  function addNote(newNote) {
    NoteDataService.create(newNote)
      .then(() => {
        console.log(newNote);
        displayNotes();
      })
      .catch(error => {
        console.log(error);
      });
    };

  function deleteNote(id) {
    NoteDataService.delete(id)
      .then(()=> {
        displayNotes();
      })
      .catch(error => {
        console.log(error);
      })
  };

  return (
      <div>
        <Header />
        <CreateArea onAdd={addNote} />
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={noteItem._id}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        }) }
        <Footer />
      </div>
  );
}

export default App;
