import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../../styles/Assignments.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import GaugeChart from 'react-gauge-chart';

const AssignmentGrades = () => {
  const { course_id, course_code } = useParams();
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchAssignmentGrades = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/v1/assignments/get-assignment-grades`,
          {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
              course_id: course_id,
              user_id: user._id,
            }),
          }
        );
        const json = await response.json();
        if (response.ok) {
          setAssignments(json);
        } else {
          console.error("Failed to fetch assignment grades:", json.error);
        }
      } catch (error) {
        console.error("Failed to fetch assignment grades:", error);
      }
    };

    fetchAssignmentGrades();
  }, [course_id, user.token, user._id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="assignments-container">
      <button className="back-button" onClick={handleGoBack}>
        Back
      </button>
      <h2>Assignment Grades for {course_code}</h2>
      <div className="assignment-list">
        {assignments.length === 0 ? (
          <p className="no-assignments">No assignments found.</p>
        ) : (
          assignments.map((assignment) => (
            <div key={assignment._id} className="assignment-list-item">
              <Link to={`/get-assignment-feedback/${assignment._id}/${course_code}`}>
                <p>
                  <strong>Assignment:</strong> {assignment.title}
                </p>
              </Link>
              {assignment.submissions.some(submission => submission.student === user._id) ? (
                <p>
                  <strong>Grade:</strong>{" "}
                  {assignment.submissions.find(submission => submission.student === user._id).grade !== undefined ?
                    (assignment.submissions.find(submission => submission.student === user._id).grade === null ?
                      "Not Graded" : 
                      assignment.submissions.find(submission => submission.student === user._id).grade + "/100"
                    ) : "Not Graded"
                  }
                </p>
              ) : (
                <p><strong>Grade:</strong> Not Graded</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
  
  
};

export default AssignmentGrades;
