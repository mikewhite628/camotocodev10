// The Cloud Functions for Firebase SDK to create
// Cloud Functions and set up triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

// Create a new user collection when new user auth is created
exports.userSignUp = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection("users").doc(user.uid).set({
    email: user.email,
    favorites: [],
    uid: user.uid,
  });
});

// delete a user collection when new user auth is delete
exports.newUserDelete = functions.auth.user().onDelete((user) => {
  const doc = admin.firestore().collection("users").doc(user.uid);
  return doc.delete();
});

// http callable function (adding a favorite)
exports.addFavorites = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "Must be logged in to add to favorites");
  }
});

