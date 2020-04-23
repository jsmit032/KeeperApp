import React, { useState, useEffect } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import NoteDataService from '../services/note-service';


function App() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getNotes() {
      setIsLoading(true);
      try {
      const response = await NoteDataService.getAll();

      const responseData = await response.data;
      console.log(responseData);

      setNotes(responseData.notes);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    getNotes();
  }, []);

  function getNotes () {
    NoteDataService.getAll()
      .then((response) => {
        const {notes} = response.data;
        //console.log(notes);
        setNotes(() => {
          return {
            notes
          }
        });
        console.log("data recieved!");
        console.log(notes);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function addNote(newNote) {
    NoteDataService.create(newNote)
      .then(() => {
        console.log(newNote);
        getNotes();
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
      <div>
        <Header />
        <CreateArea onAdd={addNote} />
        {!isLoading && notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
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
