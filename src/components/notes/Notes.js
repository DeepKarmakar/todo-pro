import React, { useEffect, useState } from "react";
import "./notes.scss";
import addNewImg from "../../assets/images/add-notes-bkg.png";
import { ArrowLeft, Plus, Trash } from "react-bootstrap-icons";
import * as http from "../../http";
import firebase from "firebase";
import { toast } from "react-toastify";
import db from "../../firebase";
import { useAuth } from "../../context/authContext";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [isNewNotes, setisNewNotes] = useState(false);
  const [addNoteForm, setAddNoteForm] = useState({
    title: "",
    description: "",
  });
  const [updateId, setUpdateId] = useState("");
  const { currentUser } = useAuth();

  const updateNotesContainer = () => {
    setisNewNotes(!isNewNotes);
  };

  const onChangeHandeler = (event) => {
    setAddNoteForm({ ...addNoteForm, [event.target.name]: event.target.value });
  };

  const clear = () => {
    debugger;
    setAddNoteForm({
      title: "",
      description: "",
    });
    setUpdateId("");
  };

  const addNewNotes = () => {
    updateNotesContainer();
    if (!addNoteForm.title && !addNoteForm.description) {
      return;
    }
    addNoteForm.timestamp = firebase.firestore.FieldValue.serverTimestamp();
    if (updateId) {
      http.updateDoc("notes", updateId, addNoteForm, currentUser.uid).then(
        (res) => {
          toast.success(res.message);
          clear();
        },
        (err) => {
          toast.error(err.message);
          clear();
        }
      );
    } else {
      http.addDoc("notes", addNoteForm, currentUser.uid).then(
        (res) => {
          toast.success(res.message);
          clear();
        },
        (err) => {
          toast.error(err.message);
          clear();
        }
      );
    }
  };

  const getTime = (timestamp) => {
    if (!timestamp) {
      return;
    }
    const time = new Date(timestamp.toDate());
    return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
  };

  const deleteHandeler = (noteItem, index) => {
    let isDeleteConfirm = window.confirm("Want to delete?");
    if (isDeleteConfirm) {
      http.deleteDoc("notes", noteItem.id, currentUser.uid).then(
        (res) => {
          toast.success(res.message);
          console.log(res);
        },
        (error) => {
          toast.error(error.message);
        }
      );
    }
  };

  const editNote = (noteItem) => {
    console.log(noteItem);
    updateNotesContainer();
    setUpdateId(noteItem.id);
    // setCurrentNote(noteItem);
    addNoteForm.title = noteItem.title || "";
    addNoteForm.description = noteItem.description || "";
    setAddNoteForm(addNoteForm);
    console.log(addNoteForm);
  };

  useEffect(() => {
    db.collection("notes")
      .doc(currentUser.uid)
      .collection("todoList")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        debugger;
        setNotes(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
  }, []);

  return (
    <div className={notes.length === 0 ? "notes noNotes" : "notes"}>
      <div className={isNewNotes ? "notesContainer hide" : "notesContainer"}>
        {/* add new item start */}
        <div
          className="notesItemWrappper addnewWrapper"
          onClick={updateNotesContainer}
        >
          <div className="notesItemInner cur-pointer">
            <h4>
              <Plus /> Add New
            </h4>
            <img src={addNewImg} alt="img" className="addNewImg" />
          </div>
        </div>
        {/* add new item end */}
        {notes.map((note, index) => (
          <div className="notesItemWrappper" key={index}>
            <Trash
              color="red"
              className="trash"
              onClick={() => deleteHandeler(note, index)}
            ></Trash>
            <div className="notesItemInner" onClick={() => editNote(note)}>
              {note.title ? <h4>{note.title}</h4> : ""}
              <div className="noteContent">
                <p>{note.description}</p>
              </div>
              <p className="noteDate">{getTime(note.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
      {isNewNotes && (
        <div className="newNotesHolder">
          <div className="d-flex justify-content-between p-10 white-bkg align-center">
            <ArrowLeft onClick={addNewNotes} className="cur-pointer" />
            <strong>Add Notes</strong>
            <div></div>
          </div>
          <div className="form-group">
            <div className="form-control">
              <label>Title</label>
              <input
                type="text"
                value={addNoteForm.title}
                name="title"
                onChange={(event) => onChangeHandeler(event)}
              />
            </div>
            <div className="form-control">
              <label>Description</label>
              <textarea
                name="description"
                value={addNoteForm.description}
                onChange={(event) => onChangeHandeler(event)}
              ></textarea>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
