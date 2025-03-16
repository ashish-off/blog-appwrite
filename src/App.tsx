import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import authservice from './appwrite/auth';
import { login, logout } from './features/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch =  useDispatch();
  
  useEffect(() => {
    authservice.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      }else {
        dispatch(logout())
      }
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])


  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full flex flex-col items-center'>
        <Header /> 
        <main>
          <Outlet /> todo
        </main>
        <Footer />
      </div>
    </div>
  ) : (null)
}

export default App