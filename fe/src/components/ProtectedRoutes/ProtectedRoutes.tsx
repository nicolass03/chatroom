import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../redux/store";

function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const userId = useSelector((state: RootState) => state.user.id);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }	
  });

  return (
    <div> {children} </div>
  )
}

export default ProtectedRoutes
