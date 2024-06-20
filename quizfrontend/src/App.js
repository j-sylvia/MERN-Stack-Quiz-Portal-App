// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Createuser from './components/Createuser';
// import Loginpage from './components/Loginpage';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './components/useradmin/Login';
import Register from './components/useradmin/Register';
import Home from './components/useradmin/Home';
import CreateCourse from './components/admin/CreateCourse';
import AttendExam from './components/user/AttendExam';
import CreateQuiz from './components/admin/CreateQuiz';


function App() {
  return (
    <div className='App'>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/create-course' element={<CreateCourse/>}/>
        <Route path='/create-quiz' element={<CreateQuiz/>}/>
        <Route path='/attend-exam' element={<AttendExam/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
