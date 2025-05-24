import { useState, useEffect } from 'react';
import { ref, onValue, set, increment } from 'firebase/database';
import { database } from '../firebase/config';

export const useViewerCount = () => {
  const [viewerCount, setViewerCount] = useState(0);

  useEffect(() => {
    // Reference to the viewer count in Firebase
    const viewerCountRef = ref(database, 'viewerCount');

    // Listen for changes to the viewer count
    const unsubscribe = onValue(viewerCountRef, (snapshot) => {
      const count = snapshot.val() || 0;
      setViewerCount(count);
    });

    // Increment the viewer count
    set(viewerCountRef, increment(1));

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return viewerCount;
}; 