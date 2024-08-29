import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MDBTableBody,MDBTableHead,MDBTable,MDBBtn,MDBContainer, MDBCard, MDBCardBody, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CourseList = () => {
  const [courses, setCourses] = useState([]); 
  const navigate = useNavigate();

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
  const handleEdit = (courseId) => {
    navigate(`/edit-course/${courseId}`);
  };

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`http://localhost:4000/users/courses/${courseId}`);
      setCourses(courses.filter(course => course._id !== courseId));
      toast.success('Course deleted successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete course.');
    }
  };

  return (
    <>
      <ToastContainer />
      <MDBContainer style={{ width: '700px', margin: 'auto auto' }} className="my-5">
        <MDBCard>
          <MDBCardBody>
            <h1 className="fw-bold mb-4 text-center">List of Courses</h1>
            <MDBTable hover>
              <MDBTableHead>
                <tr>
                  <th>Course Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td><Link to={`/courses/${course.name}`}>{course.name}</Link></td>
                    <td>
                      <MDBBtn color="warning" onClick={() => handleEdit(course._id)}>Edit</MDBBtn>
                    </td>
                    <td>
                      <MDBBtn color="danger" onClick={() => handleDelete(course._id)}>Delete</MDBBtn>
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default CourseList;
