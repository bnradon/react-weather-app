import { useState } from 'react';
import loader from '../assets/loader.gif';
import PuffLoader from "react-spinners/PuffLoader";


export default function Loader({ loading }) {
  if (!loading) return null;

  return (
    <div className="loader">
  
      <PuffLoader
        color="#eba82c"
        loading={loading}
        size={200}
        speedMultiplier={0.7}

      />

      
    </div>
  );
}
