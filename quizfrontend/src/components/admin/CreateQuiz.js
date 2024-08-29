import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBSelect, MDBSelectInput, MDBSelectOptions, MDBSelectOption } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([{ text: '', options: ['', '', '', ''], answer: '' }]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:4000/users/get-course');
        setCourses(response.data.courses);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch courses.');
      }
    };
    fetchCourses();
  }, []);

  const handleCourseChange = (event) => {
    setCourseId(event.target.value);
  };

  const handleQuestionChange = (index, event) => {
    const newQuizQuestions = [...quizQuestions];
    newQuizQuestions[index][event.target.name] = event.target.value;
    setQuizQuestions(newQuizQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const newQuizQuestions = [...quizQuestions];
    newQuizQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuizQuestions(newQuizQuestions);
  };

  const handleAddQuestion = () => {
    setQuizQuestions([...quizQuestions, { text: '', options: ['', '', '', ''], answer: '' }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:4000/users/create-quiz',
        { course: courseId, questions: quizQuestions },
        { withCredentials: true }
      );
  
      if (response.data.success) {
        toast.success('Quiz created successfully');
        navigate('/list-courses');
      } else {
        toast.error(response.data.message || 'Failed to create quiz');
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
      toast.error('An error occurred while creating the quiz.');
    }
  };
  

  return (
    <>
      <ToastContainer />
      <MDBContainer style={{ width: '700px', margin: 'auto auto' }} className="my-5">
        <form onSubmit={handleSubmit}>
          <MDBCard>
            <MDBCardBody className='d-flex flex-column'>
              <h1 className="fw-bold mb-4 text-center">Create Quiz</h1>
              <select
                className="form-select mb-4"
                value={courseId}
                onChange={handleCourseChange}
                required
              >
                <option value="" disabled>Select Course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </select>
              {quizQuestions.map((question, index) => (
                <div key={index}>
                  <MDBInput wrapperClass='mb-4' placeholder='Question' type='text' size="lg" name="text" value={question.text} onChange={(event) => handleQuestionChange(index, event)} required />
                  {question.options.map((option, optionIndex) => (
                    <MDBInput wrapperClass='mb-4' placeholder={`Option ${optionIndex + 1}`} type='text' size="lg" name={`option${optionIndex}`} value={option} onChange={(event) => handleOptionChange(index, optionIndex, event)} key={optionIndex} />
                  ))}
                  <MDBInput wrapperClass='mb-4' placeholder='Correct Answer' type='text' size="lg" name="answer" value={question.answer} onChange={(event) => handleQuestionChange(index, event)} required />
                  <hr className='my-5' style={{ height: "2rem", color: 'black' }} />
                </div>
              ))}
              <MDBBtn color='info' onClick={handleAddQuestion}>Add Question</MDBBtn>
              <MDBBtn className="mt-4 px-5" color='dark' size='lg' type="submit">Create Quiz</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </form>
      </MDBContainer>
    </>
  );
};

export default CreateQuiz;
