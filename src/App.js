import './App.css';
import Home from './pages/Home'
import Help from './pages/Help'
import Volunteer from './pages/Volunteer'
import About from './pages/About'
import Notfound from './pages/Notfound'
import Navbar from './components/Navbar';
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Post from './pages/Post';
import Editprofile from './pages/Editprofile';

import {Route, Routes} from 'react-router-dom'
import { createContext, useReducer } from 'react';
import { reducer, initialState } from './reducer/UseReducer'
export const UserContext = createContext()


function App() {

  const [state,dispatch]= useReducer(reducer, initialState)
  return (
    <div className="App">
      <UserContext.Provider value={{state, dispatch}}>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/stories' element={<Help/>} />
        <Route path='/volunteer' element={<Volunteer/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/post' element={<Post/>} />
        <Route path='/edit-profile' element={<Editprofile/>} />

        <Route path='*' element={<Notfound/>}/>
      </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
