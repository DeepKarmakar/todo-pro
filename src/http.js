import db from "./firebase";

export const getAllDocs = (collectionName, uid) =>
  new Promise((resolve, reject) => {
    const docRef = db.collection(collectionName);
    docRef
      .doc(uid)
      .collection("todoList")
      .orderBy("timestamp", "desc")
      .get()
      .then((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        resolve(docs);
      })
      .catch((err) => {
        reject({
          message: "Something went wrong!",
          error: err,
        });
      });
  });

export const addDoc = (collectionName, req, uid) =>
  new Promise((resolve, reject) => {
    db.collection(collectionName)
      .doc(uid)
      .collection("todoList")
      .add(req)
      .then((docRef) => {
        resolve({
          id: docRef.id,
          message: "Doc added successfullt",
          code: 200,
        });
      })
      .catch((err) => {
        reject({
          message: "Something went wrong!",
          error: err,
        });
      });
  });

export const deleteDoc = (collectionName, docId, uid) =>
  new Promise((resolve, reject) => {
    const docRef = db
      .collection(collectionName)
      .doc(uid)
      .collection("todoList")
      .doc(docId);
    docRef
      .delete()
      .then(() => {
        resolve({
          message: "Doc deleted successfully",
          code: 200,
        });
      })
      .catch((err) => {
        reject({
          message: "Something went wrong!",
          error: err,
        });
      });
  });

export const updateDoc = (collectionName, docId, req, uid) =>
  new Promise((resolve, reject) => {
    const docRef = db
      .collection(collectionName)
      .doc(uid)
      .collection("todoList")
      .doc(docId);
    docRef
      .update(req)
      .then((res) => {
        debugger;
        resolve({
          message: "Doc updated successfullt",
          code: 200,
        });
      })
      .catch((err) => {
        reject({
          message: "Something went wrong!",
          error: err,
        });
      });
  });
