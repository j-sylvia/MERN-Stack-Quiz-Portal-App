import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

const EditQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courseName, setCourseName] = useState(''); // Added state for course name

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/users/quizzes/${quizId}`);
        const quiz = response.data.quiz;
        setText(quiz.text);
        setOptions(quiz.options);
        setCorrectOption(quiz.answer); // Correctly set the correct option text
        setCourseId(quiz.course);

        // Fetch the course name using courseId
        const courseResponse = await axios.get(`http://localhost:4000/users/courses/${quiz.course}`);
        setCourseName(courseResponse.data.course.name);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch quiz details.');
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/users/quizzes/${quizId}`, { text, options, correctOption });
      toast.success('Quiz updated successfully');
      navigate(`/courses/${courseName}`); // Use courseName for navigation
    } catch (error) {
      console.error(error);
      toast.error('Failed to update quiz.');
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCorrectOptionChange = (value) => {
    setCorrectOption(value);
  };

  return (
    <MDBContainer>
      <h2 className="my-4">Edit Quiz</h2>
      <form onSubmit={handleSubmit}>
        <MDBInput
          label="Quiz Text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          className="mb-3"
        />
        {options.map((option, index) => (
          <MDBInput
            key={index}
            label={`Option ${index + 1}`}
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            required
            className="mb-3"
          />
        ))}
        <MDBInput
          label="Correct Option"
          type="text"
          value={correctOption}
          onChange={(e) => handleCorrectOptionChange(e.target.value)}
          required
          className="mb-3"
        />
        <MDBBtn type="submit">Save Changes</MDBBtn>
      </form>
    </MDBContainer>
  );
};

export default EditQuiz;
