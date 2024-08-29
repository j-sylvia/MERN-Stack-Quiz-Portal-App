import React, { useState } from 'react';
import axios from 'axios';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCourse = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    name: '',
    description: '',
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleError = (err) => 
    toast.error(err, {
      position: "top",
    });

  const handleSuccess = (message) => 
    toast.success(message, {
      position: "top-right",
      theme: "light"
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:4000/users/create-course',
        { ...inputValue },
        { withCredentials: true }
      );
      const { success, message, courses } = data;
      if (success) {
        handleSuccess(message);
        
        navigate('/create-quiz');
      } else {
        handleError(message);
      }
    } catch (err) {
      console.log(err);
      handleError('An error occurred while creating the course.');
    }
  };

  return (
    <>
      <ToastContainer />
      <MDBContainer style={{ width: '500px', margin: 'auto auto' }} className="my-5">
        <form onSubmit={handleSubmit}>
          <MDBCard>
            <MDBCardBody className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
                <span style={{ margin: '0 auto' }} className="h1 fw-bold mb-0">Add Course</span>
              </div>
              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Enter the course details</h5>
              <MDBInput wrapperClass='mb-4' placeholder='Course Name' type='text' size="lg" name="name" value={inputValue.name} onChange={handleOnChange} required />
              <MDBInput wrapperClass='mb-4' placeholder='Description' type='text' size="lg" name="description" value={inputValue.description} onChange={handleOnChange} required />
              <MDBBtn className="mb-4 px-5" color='dark' size='lg' type="submit">Create Course</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </form>
      </MDBContainer>
    </>
  );
};

export default CreateCourse;
