import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

const ListScore = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await axios.get('http://localhost:4000/users/list-score', { withCredentials: true });
        setScores(response.data.scores);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch score.');
      }
    };
    fetchScore();
  }, []);

  return (
    <MDBContainer className="my-5">
      <h2 className="text-center fw-bold mb-4">Quiz Score</h2>
      <MDBRow className="row-cols-1 row-cols-md-3 g-4">
        {scores.length > 0 ? (
          scores.map((exam, index) => (
            <MDBCol key={index}>
              <MDBCard className="h-100">
                <MDBCardBody>
                  <MDBCardTitle>Course: {exam.course}</MDBCardTitle>
                  <MDBCardText>
                    <p>Your Score: {exam.score}/{exam.totalScore}</p>
                    <p>Exam Date: {new Date(exam.date).toLocaleString()}</p>
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))
        ) : (
          <p className="text-center">No scores available.</p>
        )}
      </MDBRow>
    </MDBContainer>
  );
};

export default ListScore;
