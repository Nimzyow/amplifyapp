import React, { useState, useEffect } from "react";
import "./App.css";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import { listNotes } from "./graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "./graphql/mutations";

const initialFormSate = { name: "", description: "" };

const App = () => {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormSate);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const apiData = await API.graphql({ query: listNotes });
    setNotes(apiData.data.listNotes.items);
  };

  const createNote = async () => {
    if (!formData.name || !formData.description) return;
    await API.graphql({
      query: createNoteMutation,
      variables: { input: formData },
    });
    setNotes([...notes, formData]);
    setFormData(initialFormSate);
  };

  const deleteNote = async ({ id }) => {
    const newNotesArray = notes.filter((note) => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  };

  return (
    <div className="App">
      <h1>My Notes App!</h1>
      <input
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Note name"
        value={formData.name}
      />
      <input
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        value={formData.description}
        placeholder="Note description"
      />
      <button onClick={createNote}>Create Note</button>
      <div style={{ marginBottom: 30 }}>
        {notes.map((note) => (
          <div key={note.id || note.name}>
            <h2>{note.name}</h2>
            <p>{note.description}</p>
            <button onClick={() => deleteNote(note)}>Delete note</button>
          </div>
        ))}
      </div>
      <AmplifySignOut />
    </div>
  );
};

export default withAuthenticator(App);
