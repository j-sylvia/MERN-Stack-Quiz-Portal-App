import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {MDBBtn,MDBContainer,MDBCard,MDBCardBody,MDBCardImage,MDBRow,MDBCol,MDBIcon,MDBInput} from 'mdb-react-ui-kit';

import { Link,useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function CreateCourse() {
    const [data, setData] = useState(null);
    const [courseId, setCourseId] = useState(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:4000/users/create-course');
  //       setData(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    name: '',
    description: '',
  });
  const { name, description } = inputValue;

  const handleOnChange = (e) => {
    const {name,value} = e.target;
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
            {
              ...inputValue
            },
            {
              withCredentials: true
            }
          );
          const { success, message } = data;
          if (success) {
            handleSuccess(message);
            setCourseId(data.course._id); // Set the course ID state variable
            setTimeout(() => {
              navigate('/create-quiz');
            }, 6000);
          } else {
            handleError(message);
          }
        } catch (err) {
          console.log(err);
        }
        setInputValue({
          ...inputValue,
          name: '',
          description: '',
        });
      };

  return (
    // <div>
    //   {data ? (
    //     <div>{data}</div>
    //   ) : (
    //     <p>Loading...</p>
    //   )}
    // </div>
    <>
    <ToastContainer/>
    <MDBContainer style={{width:'500px',margin: 'auto auto'}} className="my-5">
      <form onSubmit={handleSubmit}>
      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <span style={{margin:'0 auto'}} className="h1 fw-bold mb-0">Add Course</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Enter the course details</h5>
              <MDBInput wrapperClass='mb-4' placeholder='Course Name' id='formControlLg' type='text' size="lg" name="name" value={name} onChange={handleOnChange}/>
                <MDBInput wrapperClass='mb-4' placeholder='Description' id='formControlLg' type='text' size="lg" name="description" value={description} onChange={handleOnChange}/>
                

              <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={handleSubmit}>Create Course</MDBBtn>
            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>
      </form>
    </MDBContainer>
    
    </>
  );
}

export default CreateCourse