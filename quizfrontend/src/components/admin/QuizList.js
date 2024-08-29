import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MDBBtn,MDBContainer, MDBCard, MDBCardBody, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const QuizList = ({ courseId }) => {
  const { courseName } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, [courseName,courseId]);

  const fetchQuizzes = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/users/courses/${courseName}/quizzes`);
      setQuizzes(data.quizzes);
      console.log("Data.quizzes: ",data.quizzes);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch quizzes.');
    }
  };

  const handleEdit = (quizId) => {
    navigate(`/edit-quiz/${quizId}`);
  };

  const handleDelete = async (quizId) => {
    try {
      await axios.delete(`http://localhost:4000/users/quizzes/${quizId}`);
      setQuizzes(quizzes.filter(quiz => quiz._id !== quizId));
      toast.success('Quiz deleted successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete quiz.');
    }
  };

  return (
    <>
      <ToastContainer />
      <MDBContainer style={{ width: '700px', margin: 'auto auto' }} className="my-5">
        <MDBCard>
          <MDBCardBody>
            <h1 className="fw-bold mb-4 text-center">Quizzes for {courseName}</h1>
            <MDBListGroup>
              {quizzes.map((quiz) => (
                <MDBListGroupItem key={quiz._id}>
                  <h5 className="fw-bold">{quiz.text}</h5>
                  <ul>
                    {quiz.options.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                  <p className="fw-bold">Correct Answer: {quiz.answer}</p>
                  <MDBBtn color="warning" onClick={() => handleEdit(quiz._id)}>Edit</MDBBtn>
                <MDBBtn color="danger" onClick={() => handleDelete(quiz._id)}>Delete</MDBBtn>
              
                </MDBListGroupItem>
              ))}
            </MDBListGroup>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default QuizList;
