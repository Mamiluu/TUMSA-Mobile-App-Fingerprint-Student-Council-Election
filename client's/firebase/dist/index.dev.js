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
Object.defineProperty(exports, "orderBy", {
  enumerable: true,
  get: function get() {
    return _firestore.orderBy;
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
Object.defineProperty(exports, "updatePassword", {
  enumerable: true,
  get: function get() {
    return _auth.updatePassword;
  }
});
Object.defineProperty(exports, "signOut", {
  enumerable: true,
  get: function get() {
    return _auth.signOut;
  }
});
Object.defineProperty(exports, "reauthenticateWithCredential", {
  enumerable: true,
  get: function get() {
    return _auth.reauthenticateWithCredential;
  }
});
Object.defineProperty(exports, "EmailAuthProvider", {
  enumerable: true,
  get: function get() {
    return _auth.EmailAuthProvider;
  }
});
Object.defineProperty(exports, "ref", {
  enumerable: true,
  get: function get() {
    return _storage.ref;
  }
});
Object.defineProperty(exports, "getDownloadURL", {
  enumerable: true,
  get: function get() {
    return _storage.getDownloadURL;
  }
});
Object.defineProperty(exports, "uploadBytes", {
  enumerable: true,
  get: function get() {
    return _storage.uploadBytes;
  }
});
exports.analytics = exports.storage = exports.db = exports.auth = void 0;

var _app = require("firebase/app");

var _analytics = require("firebase/analytics");

var _firestore = require("firebase/firestore");

var _auth = require("firebase/auth");

var _storage = require("firebase/storage");

var _asyncStorage = _interopRequireDefault(require("@react-native-async-storage/async-storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// firebase/index.js
var firebaseConfig = {
  apiKey: "AIzaSyC6_jNJTOc5uYx4En_nRgOqf4EyOGFsy00",
  authDomain: "tumsa-f.firebaseapp.com",
  projectId: "tumsa-f",
  storageBucket: "tumsa-f.appspot.com",
  messagingSenderId: "665341976469",
  appId: "1:665341976469:web:9691e94552088178c9209c",
  measurementId: "G-L9G6N45K5T"
}; // Initialize Firebase

var app = (0, _app.initializeApp)(firebaseConfig); // Initialize Firebase Auth with AsyncStorage for persistence

var auth = (0, _auth.initializeAuth)(app, {
  persistence: (0, _auth.getReactNativePersistence)(_asyncStorage["default"])
}); // Initialize Firestore

exports.auth = auth;
var db = (0, _firestore.getFirestore)(app); // Initialize Storage

exports.db = db;
var storage = (0, _storage.getStorage)(app); // Initialize Analytics only if supported

exports.storage = storage;
var analytics;
exports.analytics = analytics;
(0, _analytics.isSupported)().then(function (supported) {
  if (supported) {
    exports.analytics = analytics = (0, _analytics.getAnalytics)(app);
  }
});
//# sourceMappingURL=index.dev.js.map
