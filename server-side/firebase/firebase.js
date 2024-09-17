const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
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

module.exports = {
  uploadFileToFirebase,
};
