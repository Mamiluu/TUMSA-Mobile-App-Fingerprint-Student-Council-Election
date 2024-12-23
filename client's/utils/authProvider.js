import { useState, useEffect, useContext, createContext } from "react";
import {
  auth,
  onAuthStateChanged,
  db,
  getDocs,
  collection,
  doc,
  getDoc,
} from "../firebase";
import { formatDate, subtractDays } from "./helpers";

const AuthContext = createContext();

export function UserProvider(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [User, setUser] = useState(null);
  const [news, setNews] = useState([]);
  const [candidate, setCandidate] = useState([]);
  const [electionDate, setElectionDate] = useState(
    formatDate(subtractDays(new Date(), 5))
  );
  const [_date, set_date] = useState(-1);

  const [loading, setLoading] = useState(true);
  const [passedObject, setPassedObject] = useState({});
  const [newsObject, setNewsObject] = useState({});
  const [voteObject, setVoteObject] = useState({});
  const [updateUser, setUpdateUser] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        getUserDetails(user.uid);
        console.log("User Loaded");
      } else {
        console.log('Not logged in')
        setCurrentUser(null);
        setUser(null); // Clear User state when logged out
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [updateUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [candidatesSnapshot, newsSnapshot] = await Promise.all([
          getDocs(collection(db, "candidates")),
          getDocs(collection(db, "news"))
        ]);

        const fetchedCandidates = candidatesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCandidate(fetchedCandidates);

        const fetchedNews = newsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNews(fetchedNews);

        console.log("Candidates and News Loaded");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getDate = async () => {
      try {
        const docRef = doc(db, "elections", "date");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setElectionDate(docSnap.data().date.toString());
          const dateFromServer = formatDate(new Date(docSnap.data().date));
          const today = formatDate(new Date());
          if (today < dateFromServer) {
            set_date(1);
            console.log("Server Date is in the future");
          } else if (today === dateFromServer) {
            console.log("Server Date is today");
            set_date(0);
          } else {
            console.log("Server Date is in the past");
            set_date(-1);
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching election date:", error);
      }
    };
    getDate();
  }, []);

  const getUserDetails = async (id) => {
    try {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("User details fetched");
        const userData = docSnap.data();
        // Only set imageUrl if it's not an empty string
        if (!userData.imageUrl) {
          delete userData.imageUrl;
        }
        setUser(userData);
      } else {
        console.log("No such user!");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const values = {
    currentUser,
    setCurrentUser,
    candidate,
    news,
    electionDate,
    _date,
    setUser,
    User,
    passedObject,
    setPassedObject,
    newsObject,
    setNewsObject,
    voteObject,
    setVoteObject,
    updateUser,
    setUpdateUser,
    loading,
    getUserDetails,
  };

  return (
    <AuthContext.Provider value={values}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a UserProvider');
  }
  return context;
}