const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyAHNuwr3iAxHP9q-CfdTYlUFfr-urlBzjc",
  authDomain: "codeverse-3a59b.firebaseapp.com",
  projectId: "codeverse-3a59b",
  storageBucket: "codeverse-3a59b.appspot.com",
  messagingSenderId: "258082865132",
  appId: "1:258082865132:web:73eff05fcffb8795364ac9",
  measurementId: "G-4K0PVV4DDQ",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadFileToFirebase = async (file, userId) => {
  const storageRef = ref(
    storage,
    `user_post_upload/${userId}/${Date.now()}-${file.originalname}`
  );

  try {
    const snapshot = await uploadBytes(storageRef, file.buffer);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return {
      file_id: snapshot.metadata.name, // Assign file_id here
      downloadURL,
      type: file.mimetype.startsWith("image/") ? "image" : "video",
    };
  } catch (error) {
    console.error("Error uploading file to Firebase:", error);
    throw error;
  }
};
// Function to upload the file to Firebase Storage
const uploadFileToFirebaseProfile = async (file, userId) => {
  const storageRef = ref(
    storage,
    `profile_photo/${userId}/${file.originalname}`
  );

  try {
    const snapshot = await uploadBytes(storageRef, file.buffer);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return {
      downloadURL, // Return only the download URL
    };
  } catch (error) {
    console.error("Error uploading profile photo to Firebase:", error);
    throw error;
  }
};
///////////////////
// Function to delete the file from Firebase Storage
const deleteFileFromFirebase = async (filePath) => {
  const fileRef = ref(storage, filePath); // Ensure filePath is the correct reference
  console.log("Deleting file at:", fileRef.fullPath); // Log full path

  try {
    await deleteObject(fileRef); // Delete the object
    console.log("File deleted successfully.");
  } catch (error) {
    console.error("Error deleting file from Firebase:", error);
    throw error; // Rethrow to handle in the route
  }
};
module.exports = {
  uploadFileToFirebase,
  uploadFileToFirebaseProfile,
  deleteFileFromFirebase,
};
