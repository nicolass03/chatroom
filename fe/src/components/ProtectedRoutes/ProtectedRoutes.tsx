import { useSelector } from "react-redux";
import React, { useEffect } from 'react'
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

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
