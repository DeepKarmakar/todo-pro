import React, { useState } from "react";
import "./notes.scss";
import addNewImg from "../../assets/images/add-notes-bkg.png";
import { ArrowLeft, Plus } from "react-bootstrap-icons";

export default function Notes() {
  const notes = [
    {
      title: "notes title",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut quae sit fugit minus aspernatur voluptate praesentium, voluptatem quam minima, accusantium debitis omnis. Blanditiis iure omnis, consequatur velit qui repellat porro!",
      date: "20 may",
    },
    {
      title: "notes title",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut quae sit fugit minus aspernatur voluptate praesentium,  iure omnis, consequatur velit qui repellat porro!",
      date: "20 may",
    },
    {
      title: "notes title",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut quae sit fugit minus aspernatur voluptate praesentium, voluptatem quam minima, accusantium debitis omnis. Blanditiis iure omnis, consequatur velit qui repellat porro! voluptatem quam minima, accusantium debitis omnis. Blanditiis",
      date: "20 may",
    },
    {
      title: "notes title",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut quae sit fugit minus aspernatur voluptate praesentium, voluptatem quam minima,  porro!",
      date: "20 may",
    },
    {
      title: "notes title",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut quae sit fugit minus aspernatur voluptate praesentium, voluptatem quam minima, accusantium debitis omnis. Blanditiis iure omnis, consequatur velit qui repellat porro! voluptatem quam minima, accusantium debitis omnis. Blanditiis",
      date: "20 may",
    },
    {
      title: "notes title",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut quae sit fugit minus aspernatur voluptate praesentium, voluptatem quam minima,  porro!",
      date: "20 may",
    },
  ];
  const [isNewNotes, setisNewNotes] = useState(false);

  const updateNewNotes = () => {
    setisNewNotes(!isNewNotes);
  };
  return (
    <div className="notes">
      <div className={isNewNotes ? "notesContainer hide" : "notesContainer"}>
        {/* add new item start */}
        <div
          className="notesItemWrappper addnewWrapper"
          onClick={updateNewNotes}
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
            <div className="notesItemInner">
              <h4>{note.title}</h4>
              <div className="noteContent">
                <p>{note.content}</p>
              </div>
              <p className="noteDate">{note.date}</p>
            </div>
          </div>
        ))}
      </div>
      {isNewNotes && (
        <div className="newNotesHolder">
          <div className="d-flex justify-content-between p-10 white-bkg align-center">
            <ArrowLeft onClick={updateNewNotes} className="cur-pointer" />
            <strong>Add Notes</strong>
            <div></div>
          </div>
          <div className="form-group">
            <div className="form-control">
              <label>Title</label>
              <input type="text" />
            </div>
            <div className="form-control">
              <label>Description</label>
              <textarea></textarea>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
