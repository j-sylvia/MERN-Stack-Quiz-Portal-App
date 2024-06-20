import React, { useState } from 'react';
import axios from 'axios';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
function CreateQuiz() {
  const navigate = useNavigate();
  const [courseId, setCourseId] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([{ question: '', options: ['', '', '', ''], answer: '' }]);
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
    setQuizQuestions([...quizQuestions, { question: '', options: ['', '', '', ''], answer: '' }]);
  };
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     // Replace with your API endpoint
  //     console.log(quizQuestions)
  //     const response = await axios.post('http://localhost:4000/users/create-quiz', { questions: quizQuestions }, { withCredentials: true });
  //     if (response.data.success) {
  //       toast.success(response.data.message);
  //       navigate('/dashboard'); // Navigate to the dashboard or another appropriate route
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error('An error occurred while creating the quiz.');
  //   }
  // };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!courseId) {
      toast.error('Please create a course first.');
      return;
    }
  
    try {
      for (const question of quizQuestions) {
        const response = await axios.post('/users/create-quiz', {
          course: courseId, // Use the state variable here
          text: question.question,
          options: question.options,
          answer: question.answer
        });
  
        if (!response.data.success) {
          toast.error(response.data.message);
          return; // Stop sending further questions if an error occurs
        }
      }
  
      toast.success('All questions created successfully');
    } catch (error) {
      console.error(error);
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
              {quizQuestions.map((question, index) => (
                <div key={index}>
                  <MDBInput wrapperClass='mb-4' placeholder='Question' type='text' size="lg" name="question" value={question.question} onChange={(event) => handleQuestionChange(index, event)} />
                  {question.options.map((option, optionIndex) => (
                    <MDBInput wrapperClass='mb-4' placeholder={`Option ${optionIndex + 1}`} type='text' size="lg" name={`option${optionIndex}`} value={option} onChange={(event) => handleOptionChange(index, optionIndex, event)} key={optionIndex} />
                  ))}
                  <MDBInput wrapperClass='mb-4' placeholder='Correct Answer' type='text' size="lg" name="answer" value={question.answer} onChange={(event) => handleQuestionChange(index, event)} />
                <hr className='my-5' style={{height:"2rem",color:'black'}}/>
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
}
export default CreateQuiz;
