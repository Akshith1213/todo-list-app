import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);