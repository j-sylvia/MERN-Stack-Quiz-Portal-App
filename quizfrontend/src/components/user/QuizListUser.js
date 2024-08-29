import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { MDBContainer, MDBCard, MDBCardBody, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const QuizListUser = () => {
  const navigate = useNavigate();
  const { courseName } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/users/courses/${courseName}/quizzes`);
        console.log(response.data);
        setQuizzes(response.data.quizzes);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch quizzes.');
      }
    };
    fetchQuizzes();
  }, [courseName]);

  const handleAnswerSelection = (quizId, optionIndex) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [quizId]: optionIndex,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
      // Check if any quiz is not selected
  if (Object.keys(selectedAnswers).length !== quizzes.length) {
    toast.error('Please answer all the quizzes before submitting.');
    return;
  }
    try {
      const response = await axios.post(
        `http://localhost:4000/users/courses/${courseName}/quizzes/submit`,
        { selectedAnswers },
        { withCredentials: true }
      );
      const s=response.data.score
      console.log(response.data);
      console.log(response.data.success)
      if (response.data.success) {
        toast.success(`${response.data.message}, Your Score: ${s}`);
        setTimeout(() => {
          navigate(`/list-score`);
        }, 6000); 
      } else {
        toast.error(response.data.message || 'Failed to submit quiz...');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit quiz.');
    }
  };

  return (
    <MDBContainer style={{ width: '700px', margin: 'auto auto' }} className="my-5">
    <ToastContainer />
      <MDBCard>
        <MDBCardBody>
          <h1 className="fw-bold mb-4 text-center">Quizzes for {courseName}</h1>
          <MDBCardBody>
            {quizzes.map((quiz) => (
              <div className="mb-5" key={quiz._id}>
                <h3> {quiz.text}</h3>
                <ul className="list-group list-group-light list-group-numbered">
                  <li className="list-group-item d-flex justify-content-between align-items-start list-group-item-action">
                  <label className='form-check-label' htmlFor={`${quiz._id}-0`}>{quiz.options[0]}</label> <input className="form-check-input"
                      type="radio"
                      value={quiz._id}
                      name={quiz._id} id={`${quiz._id}-0`}
                      onChange={() => handleAnswerSelection(quiz._id, 0)}
                      checked={selectedAnswers[quiz._id] === 0}
                    />
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-start list-group-item-action">
                  <label className='form-check-label' htmlFor={`${quiz._id}-1`}>{quiz.options[1]}</label> <input className="form-check-input"
                      type="radio"
                      value={quiz._id}
                      name={quiz._id} id={`${quiz._id}-1`}
                      onChange={() => handleAnswerSelection(quiz._id, 1)}
                      checked={selectedAnswers[quiz._id] === 1}
                    />
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-start list-group-item-action">
                  <label className='form-check-label' htmlFor={`${quiz._id}-2`}>{quiz.options[2]}</label> <input  className="form-check-input"
                      type="radio"
                      value={quiz._id}
                      name={quiz._id} id={`${quiz._id}-2`}
                      onChange={() => handleAnswerSelection(quiz._id, 2)}
                      checked={selectedAnswers[quiz._id] === 2}
                    />
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-start list-group-item-action">
                    <label className='form-check-label' htmlFor={`${quiz._id}-3`}>{quiz.options[3]}</label>  <input className="form-check-input"
                      type="radio"
                      value={quiz._id}
                      name={quiz._id} id={`${quiz._id}-3`}
                      onChange={() => handleAnswerSelection(quiz._id, 3)}
                      checked={selectedAnswers[quiz._id] === 3}
                    />
                  </li>
                </ul>
              </div>
            ))}
            <button
              onClick={handleSubmit}
              className="btn btn-primary mt-3">Submit Quiz</button>
          </MDBCardBody>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default QuizListUser;