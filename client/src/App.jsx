import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

const API_URL = 'http://localhost:5000/notes'; // Change this after deploying

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Function to fetch notes
  const fetchNotes = async () => {
    setLoading(true); // Start loading
    try {
      const res = await axios.get(API_URL); // Fetch notes from backend
      setNotes(res.data); // Update state with the fetched notes
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
    setLoading(false); // Stop loading once request is complete
  };

  // Fetch notes on initial page load (component mount)
  useEffect(() => {
    fetchNotes(); // Call fetchNotes when component is mounted
  }, []); // Empty dependency array means this runs only once when the component is mounted

  // Handle adding a new note
  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when adding a note
    try {
      await axios.post(API_URL, { title, content }); // Add note via POST request
      setTitle(''); // Clear title input
      setContent(''); // Clear content input
      fetchNotes(); // Refresh notes after adding
    } catch (error) {
      console.error('Error adding note:', error);
    }
    setLoading(false); // Stop loading after request is complete
  };

  // Handle deleting a note
  const handleDelete = async (id) => {
    setLoading(true); // Start loading when deleting a note
    try {
      await axios.delete(`${API_URL}/${id}`); // Delete note via DELETE request
      fetchNotes(); // Refresh notes after deleting
    } catch (error) {
      console.error('Error deleting note:', error);
    }
    setLoading(false); // Stop loading after request is complete
  };

  return (
    <div className="app-container">
      <h2 className="app-title">Mini Notes</h2>

      {/* Form to add a new note */}
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
