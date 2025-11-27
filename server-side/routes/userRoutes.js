const express = require("express");
const router = express.Router();
const User = require("../models/user");
const multer = require("multer");
const { generateToken, jwtAuthMiddleware } = require("../jwt"); 
const {
  uploadFileToFirebaseProfile,
  deleteFileFromFirebase,
} = require("../firebase/firebase");
//const bucket = require("../firebase/firebaseAdmin"); 
const storage = multer.memoryStorage(); // Store files in memory before sending to Firebase
const upload = multer({ storage });
// User registration
router.post("/sign-up", async (req, res) => {
  try {
    const { username, password, email, name } = req.body;

    if (!username || !password || !email || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const user = new User({ username, password, email, name });

    // Save the user with hashed password
    await user.save();

    const token = generateToken({ id: user._id });
    res.status(201).json({ user, token });
  } catch (err) {
    console.error("Error during sign-up:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// User login
router.post("/sign-in", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res
        .status(400)
        .json({ message: "Identifier and password are required" });
    }

    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = generateToken({ id: user._id });
    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// User sign-out (optional, for client-side implementation)
router.post("/sign-out", (req, res) => {
  res.status(200).json({ message: "User signed out successfully" });
});

// User profile update
router.put("/update-profile", async (req, res) => {
  try {
    const { userId, name, profilePhoto, bio } = req.body;

    // Validate inputs if necessary
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (profilePhoto) user.profilePhoto = profilePhoto;
    if (bio) user.bio = bio;

    await user.save();

    res.status(200).json({ user });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


//serach user
// Add this code to your user routes file

// Search users by username or name
// Search users by username or name from request body
router.post("/search", async (req, res) => {
  try {
    const { query } = req.body; // Get 'query' from the request body

    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    // Perform case-insensitive search by username or name
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } }
      ]
    });

    res.json(users);
  } catch (err) {
    console.error("Error during user search:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});
// Get user details by ID
router.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from request parameters

    // Find the user by ID
    const user = await User.findById(userId);

    // If user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude sensitive information like password from the response
    const { password, ...userDetails } = user.toObject();

    // Send the user details as a response
    res.json(userDetails);
  } catch (error) {
    console.error("Error fetching user details by ID:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

//////////////
// Upload profile photo
// router.post(
//   "/upload-profile-photo",
//   jwtAuthMiddleware, // Ensure JWT is verified and user ID is available in req.user
//   upload.single("file"), // Assuming you're using multer or similar for file uploads
//   async (req, res) => {
//     try {
//       // Check if the file was uploaded
//       if (!req.file) {
//         return res.status(400).json({ message: "No file uploaded" });
//       }

//       // Get user ID from the request context (after JWT verification)
//       const userId = req.user.id; // Ensure this is set in your JWT payload

//       // Fetch current user to check for existing profile photo
//       const user = await User.findById(userId);
//       console.log(
//         "Current user profile photo:",
//         user ? user.profilePhoto : "User not found"
//       );

//       // If a profile photo exists, delete it
//       if (user && user.profilePhoto) {
//         console.log("Attempting to delete existing photo...");
//         try {
//           await deleteFileFromFirebase(user.profilePhoto);
//         } catch (deleteError) {
//           if (deleteError.code === "storage/object-not-found") {
//             console.warn("File does not exist, skipping deletion.");
//           } else {
//             console.error("Failed to delete existing photo:", deleteError);
//             return res.status(500).json({
//               message: "Failed to delete existing photo",
//               error: deleteError.message,
//             });
//           }
//         }
//       }

//       // Upload the new file to Firebase and get the download URL
//       const { downloadURL } = await uploadFileToFirebaseProfile(
//         req.file,
//         userId
//       );
//       console.log("Uploaded new profile photo URL:", downloadURL);

//       // Update user's profile with the new photo URL and original file name
//       const updatedUser = await User.findByIdAndUpdate(
//         userId,
//         {
//           profilePhoto: req.file.originalname, // Save the uploaded file URL
//         },
//         { new: true, upsert: true } // Use upsert to create the field if it doesn't exist
//       );

//       // Respond with the file URL
//       return res.status(200).json({
//         message: "Profile photo uploaded successfully",
//         fileUrl: downloadURL,
//       });
//     } catch (error) {
//       console.error("Upload error:", error);
//       return res.status(500).json({
//         message: "Error uploading file",
//         error: error.message || error,
//       });
//     }
//   }
// );
router.post(
  "/upload-profile-photo",
  jwtAuthMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const userId = req.user.id;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Delete previous photo from Firebase if it exists
      if (user.profilePhoto) {
        try {
          await deleteFileFromFirebase(user.profilePhoto);
        } catch (deleteError) {
          if (deleteError.code === "storage/object-not-found") {
            console.warn("Old photo not found in Firebase.");
          } else {
            console.error("Error deleting old photo:", deleteError);
            return res.status(500).json({
              message: "Failed to delete existing photo",
              error: deleteError.message,
            });
          }
        }
      }

      // Upload new file to Firebase and get download URL
      const { downloadURL } = await uploadFileToFirebaseProfile(
        req.file,
        userId
      );
      console.log("New profile photo URL:", downloadURL);

      // Save the downloadURL in the user profile
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePhoto: downloadURL },
        { new: true }
      );

      return res.status(200).json({
        message: "Profile photo uploaded successfully",
        fileUrl: downloadURL,
        user: updatedUser,
      });
    } catch (error) {
      console.error("Upload error:", error);
      return res.status(500).json({
        message: "Error uploading file",
        error: error.message || error,
      });
    }
  }
);

router.get("/user-id", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the JWT payload
    res.json({ userId });
  } catch (error) {
    console.error("Error retrieving user ID:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});




module.exports = router;
