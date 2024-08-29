import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBListGroup, MDBListGroupItem, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseListUser = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:4000/users/get-course');
      setCourses(response.data.courses); 
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch courses.');
    }
  };

  return (
    <>
      <ToastContainer />
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBCardBody>
            <h1 className="fw-bold mb-4 text-center">List of Courses</h1>
            <MDBRow>
              {courses.map((course) => (
                <MDBCol md="4" key={course._id} className="mb-4">
                  <Link to={`/courses-user/${course.name}`}>
                    <MDBCard>
                      <MDBCardBody>
                        <MDBListGroupItem><h5>{course.name}</h5></MDBListGroupItem>
                        {/* <MDBListGroupItem><h6 style={{ color: 'gray',textDecoration: 'none !important' }}>Description: {course.description}</h6></MDBListGroupItem> */}
                      </MDBCardBody>
                    </MDBCard>
                  </Link>
                </MDBCol>
              ))}
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default CourseListUser;
