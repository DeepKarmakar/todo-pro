import db from "./firebase";

export const getAllDocs = (collectionName) =>
  new Promise((resolve, reject) => {
    const docRef = db.collection(collectionName);
    docRef
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

export const addDoc = (collectionName, req) =>
  new Promise((resolve, reject) => {
    db.collection(collectionName)
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

export const deleteDoc = (collectionName, docId) =>
  new Promise((resolve, reject) => {
    const docRef = db.collection(collectionName).doc(docId);
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

export const updateDoc = (collectionName, docId, req) =>
  new Promise((resolve, reject) => {
    const docRef = db.collection(collectionName).doc(docId);
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
