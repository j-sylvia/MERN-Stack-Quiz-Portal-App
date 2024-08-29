import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

const EditCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [name, setCourseName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/users/courses/${courseId}`);
        setCourseName(response.data.course.name);
        setDescription(response.data.course.description);
        console.log("Edit course name",response.data.course.name);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch course details.');
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/users/courses/${courseId}`, { name, description });
      toast.success('Course updated successfully');
      navigate('/list-courses');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update course.');
    }
  };

  return (
    <MDBContainer>
      <h2 className="my-4">Edit Course</h2>
      <form onSubmit={handleSubmit}>
        <MDBInput
          label="Course Name"
          type="text"
          value={name}
          onChange={(e) => setCourseName(e.target.value)}
          required
          className="mb-3"
        />
        <MDBInput
          label="Description"
          type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mb-3"
        />
        <MDBBtn type="submit">Save Changes</MDBBtn>
      </form>
    </MDBContainer>
  );
};

export default EditCourse;
