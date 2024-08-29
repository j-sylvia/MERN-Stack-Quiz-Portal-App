import React from 'react'
import {MDBBtn,MDBContainer,MDBCard,MDBCardBody,MDBCardImage,MDBRow,MDBCol,MDBIcon,MDBInput} from 'mdb-react-ui-kit';
import { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {

  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const { name, email, password, phone } = inputValue;

  const handleOnChange = (e) => {
    const {name,value} = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleError = (err) => 
    toast.error(err, {
      position: "top-right",
      });

      const handleSuccess = (message) => 
    toast.success(message, {
      position: "top-right",
      theme: "dark"
      });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(
        'http://localhost:4000/users/signup',
        {
          ...inputValue
        },
        {
          withCredentials: true
        }
      );
      const {success,message,token} = data;
      if(success) {
        handleSuccess(message);
        localStorage.setItem('token', token);
        setTimeout(() => {
          navigate('/login');
        }, 7000);
      } else {
        handleError(message);
      }
    } catch (err) {
      console.log(err);
    }
    setInputValue({
      ...inputValue,
      name: '',
      email: '',
      password: '',
      phone: ''
    });
  };
  return (
    <>
    <ToastContainer/>
    <MDBContainer style={{width:'500px',margin: 'auto auto'}} className="my-5">
      <form onSubmit={handleSubmit}>
      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <span style={{margin:'0 auto'}} className="h1 fw-bold mb-0">Quiz  Registration</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign up your account</h5>
              <MDBInput wrapperClass='mb-4' placeholder='Name' id='formControlLg' type='text' size="lg" name="name" value={name} onChange={handleOnChange}/>
                <MDBInput wrapperClass='mb-4' placeholder='Email' id='formControlLg' type='email' size="lg" name="email" value={email} onChange={handleOnChange}/>
                <MDBInput wrapperClass='mb-4' placeholder='Password' id='formControlLg' type='password' size="lg" name="password" value={password} onChange={handleOnChange}/>
                <MDBInput wrapperClass='mb-4' placeholder='Phone' id='formControlLg' type='number' size="lg" name="phone" value={phone} onChange={handleOnChange}/>

              <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={handleSubmit}>Register</MDBBtn>
              {/* <a className="small text-muted" href="#!">Forgot password?</a> */}
              <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Already have an account? <a href="/login" style={{color: '#393f81'}}>Login here</a></p>
            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>
      </form>
    </MDBContainer>
    
    </>
  )
}

export default Register
