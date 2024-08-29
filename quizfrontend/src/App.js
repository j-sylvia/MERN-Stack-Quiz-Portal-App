import './App.css';
import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './components/useradmin/Login';
import Register from './components/useradmin/Register';
import Home from './components/useradmin/Home';
import CreateCourse from './components/useradmin/CreateCourse';
import CreateQuiz from './components/admin/CreateQuiz';
import CourseList from './components/useradmin/CourseList';
import QuizList from './components/admin/QuizList';
import CourseListUser from './components/user/CourseListUser';
import QuizListUser from './components/user/QuizListUser';
import ListScore from './components/user/ListScore';
import Navbar from './Navbar';
import EditCourse from './components/useradmin/EditCourse';
import EditQuiz from './components/admin/EditQuiz';
import axios from 'axios';
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:4000/users/profile', { withCredentials: true });
        setUser(response.data.userAdmin);
        
      } catch (error) {
        console.error('Failed to fetch user info', error);
      }
    };
    console.log('App User:',user)
    fetchUser();
  }, []);
  return (
    <div className='App'>
    <BrowserRouter>
    <Navbar/>
      <Routes> 
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        {user && user === true && (
          <>
        <Route path='/create-course' element={<CreateCourse/>}/>
        <Route path='/create-quiz' element={<CreateQuiz/>}/>
        <Route path="/list-courses" element={<CourseList />} />
        <Route path="/edit-course/:courseId" element={<EditCourse/>} />
        <Route path="/edit-quiz/:quizId" element={<EditQuiz/>} />
        <Route path="/courses/:courseName" element={<QuizList />} />
        </>
          )}
        <Route path="/list-course" element={<CourseListUser />} />
        <Route path="/list-score" element={<ListScore />} />
        <Route path="/courses-user/:courseName" element={<QuizListUser/>} />
      </Routes>     
    </BrowserRouter>
    </div>
  );
}

export default App;
