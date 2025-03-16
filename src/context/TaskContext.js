import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../config/firebase';
import { useAuth } from './AuthContext';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setTasks([]);
      return;
    }

    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, [user]);

  const addTask = async (newTask) => {
    if (!user) return;

    const task = {
      text: newTask.text,
      completed: false,
      priority: newTask.priority || 'low',
      category: newTask.category || '',
      created: new Date(),
      userId: user.uid
    };

    await addDoc(collection(db, 'tasks'), task);
  };

  const updateTask = async (id, updates) => {
    if (!user) return;
    await updateDoc(doc(db, 'tasks', id), updates);
  };

  const deleteTask = async (id) => {
    if (!user) return;
    await deleteDoc(doc(db, 'tasks', id));
  };

  const statistics = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      deleteTask,
      statistics
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);