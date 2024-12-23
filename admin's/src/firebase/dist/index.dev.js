"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "collection", {
  enumerable: true,
  get: function get() {
    return _firestore.collection;
  }
});
Object.defineProperty(exports, "getDocs", {
  enumerable: true,
  get: function get() {
    return _firestore.getDocs;
  }
});
Object.defineProperty(exports, "query", {
  enumerable: true,
  get: function get() {
    return _firestore.query;
  }
});
Object.defineProperty(exports, "where", {
  enumerable: true,
  get: function get() {
    return _firestore.where;
  }
});
Object.defineProperty(exports, "addDoc", {
  enumerable: true,
  get: function get() {
    return _firestore.addDoc;
  }
});
Object.defineProperty(exports, "deleteDoc", {
  enumerable: true,
  get: function get() {
    return _firestore.deleteDoc;
  }
});
Object.defineProperty(exports, "doc", {
  enumerable: true,
  get: function get() {
    return _firestore.doc;
  }
});
Object.defineProperty(exports, "setDoc", {
  enumerable: true,
  get: function get() {
    return _firestore.setDoc;
  }
});
Object.defineProperty(exports, "getDoc", {
  enumerable: true,
  get: function get() {
    return _firestore.getDoc;
  }
});
Object.defineProperty(exports, "updateDoc", {
  enumerable: true,
  get: function get() {
    return _firestore.updateDoc;
  }
});
Object.defineProperty(exports, "signInWithEmailAndPassword", {
  enumerable: true,
  get: function get() {
    return _auth.signInWithEmailAndPassword;
  }
});
Object.defineProperty(exports, "createUserWithEmailAndPassword", {
  enumerable: true,
  get: function get() {
    return _auth.createUserWithEmailAndPassword;
  }
});
Object.defineProperty(exports, "onAuthStateChanged", {
  enumerable: true,
  get: function get() {
    return _auth.onAuthStateChanged;
  }
});
Object.defineProperty(exports, "updateProfile", {
  enumerable: true,
  get: function get() {
    return _auth.updateProfile;
  }
});
Object.defineProperty(exports, "signOut", {
  enumerable: true,
  get: function get() {
    return _auth.signOut;
  }
});
exports.db = exports.auth = exports.analytics = void 0;

var _app = require("firebase/app");

var _analytics = require("firebase/analytics");

var _firestore = require("firebase/firestore");

var _auth = require("firebase/auth");

// Import the functions you need from the SDKs you need
var firebaseConfig = {
  apiKey: "AIzaSyAzz9vvTtG-yJyJBLvNL5RVni6cJ-DNe-o",
  authDomain: "tumsa-39e36.firebaseapp.com",
  projectId: "tumsa-39e36",
  storageBucket: "tumsa-39e36.appspot.com",
  messagingSenderId: "656754385049",
  appId: "1:656754385049:web:bbe3ad4ecbc002f4681808",
  measurementId: "G-JTLC2R5ZQ2"
}; // Initialize Firebase

var app = (0, _app.initializeApp)(firebaseConfig);
var auth = (0, _auth.getAuth)(app);
exports.auth = auth;
var analytics = (0, _analytics.getAnalytics)(app);
exports.analytics = analytics;
var db = (0, _firestore.getFirestore)(app);
exports.db = db;
//# sourceMappingURL=index.dev.js.map
