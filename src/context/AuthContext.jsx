console.log("AuthContext.jsx: Evaluation started");
import React, { createContext, useContext, useState, useEffect } from 'react';
import AnimatedBackground from '../components/AnimatedBackground';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut 
} from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setUser(user);
        if (user) {
          // Fetch user progress from Firestore
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            setUserProgress(userDoc.data().progress || {});
          } else {
            // Create initial user document
            await setDoc(userDocRef, {
              email: user.email, // Changed from currentUser.email
              displayName: user.displayName, // Changed from currentUser.displayName
              photoURL: user.photoURL, // Changed from currentUser.photoURL
              progress: {}
            });
            setUserProgress({});
          }
        } else {
          setUserProgress({});
        }
      } catch (error) {
        console.error("Error in AuthProvider:", error);
        setUserProgress({});
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    return signOut(auth);
  };

  const completeLesson = async (manualId, topicId) => {
    if (!user) return;

    const userDocRef = doc(db, 'users', user.uid);
    const newProgress = { ...userProgress };
    
    if (!newProgress[manualId]) {
      newProgress[manualId] = [];
    }
    
    if (!newProgress[manualId].includes(topicId)) {
      newProgress[manualId].push(topicId);
      
      await updateDoc(userDocRef, {
        [`progress.${manualId}`]: arrayUnion(topicId)
      });
      
      setUserProgress(newProgress);
    }
  };

  const value = {
    user,
    userProgress,
    loading,
    loginWithGoogle,
    logout,
    completeLesson
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <>
          <AnimatedBackground />
          <div style={{ 
            height: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'transparent',
            color: 'rgba(255,255,255,0.6)',
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '0.9rem',
            letterSpacing: '0.05em'
          }}>
            Cargando aplicación...
          </div>
        </>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
