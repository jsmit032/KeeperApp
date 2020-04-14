import React from 'react';
import Heading from './Heading';
import Footer from './Footer';
import Note from './Note';
import Entry from '../notes';

//console.log(Entry);

function App() {
    return (
        <div>
            <Heading />
            {Entry.map(noteEntry => (
                <Note 
                    key={noteEntry.key}
                    title={noteEntry.title}
                    content={noteEntry.content}
                />
            ))}
            <Footer />
        </div>
    );
}

export default App;