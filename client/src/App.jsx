import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

const API_URL = 'https://mini-notes-app-backend.onrender.com/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchNotes = async () => {
    setLoading(true); 
    try {
      const res = await axios.get(API_URL); 
      setNotes(res.data); 
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
    setLoading(false); 
  };

  useEffect(() => {
    fetchNotes(); 
  }, []); 

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      await axios.post(API_URL, { title, content }); 
      setTitle(''); 
      setContent(''); 
      fetchNotes(); 
    } catch (error) {
      console.error('Error adding note:', error);
    }
    setLoading(false); 
  };

  const handleDelete = async (id) => {
    setLoading(true); 
    try {
      await axios.delete(`${API_URL}/${id}`); // Delete note via DELETE request
      fetchNotes(); 
    } catch (error) {
      console.error('Error deleting note:', error);
    }
    setLoading(false); 
  };

  return (
    <div className="app-container">
      <h2 className="app-title">Mini Notes</h2>

      <form className="note-form" onSubmit={handleAdd} style={{ position: 'sticky', top: 0, background: 'white', paddingBottom: '1rem' }}>
        <input
          className="input-field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <br />
        <textarea
          className="input-field"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        />
        <br />
        <button className="submit-button" type="submit">Add Note</button>
      </form>

     
      {loading ? (
        <p className="loading-text">Loading...</p>  
      ) : (
        <ul className="notes-list">
          {notes.map((note) => (
            <li className="note-item" key={note._id}>
              <strong>{note.title}</strong>
              <p>{note.content}</p>
              <button
                className="delete-button"
                onClick={() => handleDelete(note._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
