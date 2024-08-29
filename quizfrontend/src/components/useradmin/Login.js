import React, {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {MDBBtn,MDBContainer,MDBCard,MDBCardBody,MDBCardImage,MDBRow,MDBCol,MDBIcon,MDBInput} from 'mdb-react-ui-kit';

function Login() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies([]);
  const [inputValue, setInputValue] = useState({
    email: '',
    password: ''
  });
  const {email, password} = inputValue;

  const handleOnChange = (e) => {
    const {name,value} = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleError = (err) => 
    toast.error(err, {
      position: "bottom-left",
      });

      const handleSuccess = (message) => 
    toast.success(message, {
      position: "bottom-left",
      theme: "dark",

      });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(inputValue);
      const {data} = await axios.post(
        'http://localhost:4000/users/login',
        {
          ...inputValue
        },
        {
          withCredentials: true
        }
      );
      const {success,message,token,role,userName,userId} = data;
      if(success) {
        handleSuccess(message);
        setCookie('token', token, { path: '/' });
        setCookie('userName', userName, { path: '/' });
        setCookie('userId', userId, { path: '/' });
        localStorage.setItem('token', token); 
        localStorage.setItem('role', role);
        
        console.log("Role:",role)
        console.log("UserName:",userName)
        console.log("UserId:",userId)
        console.log(token)
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 6000);
      } else {
        handleError(message);
      }
    } catch (err) {
      console.log(err);
    }
    setInputValue({
      ...inputValue,
      email: '',
      password: ''
    });
  };
  return (
    <MDBContainer style={{width:'500px',margin: 'auto auto'}} className="my-5">
      <form onSubmit={handleSubmit}>
      <MDBCard>
        <MDBRow className='g-0'>

          {/* <MDBCol md='6'>
            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100'/>
          </MDBCol> */}

          <MDBCol>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                {/* <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/> */}
                <span style={{margin:'0 auto'}} className="h1 fw-bold mb-0">Quiz Portal Login</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

                <MDBInput wrapperClass='mb-4' placeholder='Email address' id='formControlLg' type='email' size="lg" name="email" value={email} onChange={handleOnChange}/>
                <MDBInput wrapperClass='mb-4' placeholder='Password' id='formControlLg' type='password' size="lg" name="password" value={password} onChange={handleOnChange}/>

              <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={handleSubmit}>Login</MDBBtn>
              {/* <a className="small text-muted" href="#!">Forgot password?</a> */}
              <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="/register" style={{color: '#393f81'}}>Register here</a></p>

              {/* <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div> */}

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>
      </form>
      <ToastContainer/>
    </MDBContainer>
  )
}

export default Login
