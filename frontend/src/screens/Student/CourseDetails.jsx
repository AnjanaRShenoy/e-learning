import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardLink,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEnrolMutation } from "../../slices/userApiSlice";
import { toast } from "react-toastify";

function CourseDetails() {
  const { userInfo } = useSelector((state) => state.auth);

  const { postId } = useParams();
  const [post, setPost] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/student/getFullDetails`, {
        params: {
          _id: postId,
          userInfo: userInfo,
        },
      });
      console.log(res.data);
      setPost(res.data.course);
      setEnrollment(res.data.enrol);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
 

  const [enrolCourse] = useEnrolMutation();
  const enrol = async () => {
    try {
      const res = await enrolCourse({ userInfo, postId }).unwrap();
      fetchData()
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MDBCard style={{ maxWidth: "500px" }}>
      <MDBCardImage
        position="top"
        alt="..."
        src="https://mdbootstrap.com/img/new/standard/city/062.webp"
        style={{ height: "200px" }}
      />
      {post ? (
        <MDBCardBody key={post.id}>
          <MDBCardTitle>{post.courseName}</MDBCardTitle>
          <MDBCardText>{post.description}</MDBCardText>
        </MDBCardBody>
      ) : null}
      {post ? (
        <MDBListGroup flush>
          <MDBListGroupItem>
            Date-{" "}
            <strong>{new Date(post.date).toLocaleDateString("en-GB")}</strong>
          </MDBListGroupItem>
          <MDBListGroupItem>
            Time- <strong>{post.time}</strong>
          </MDBListGroupItem>
          <MDBListGroupItem>
            Category- <strong>{post.category}</strong>
          </MDBListGroupItem>
        </MDBListGroup>
      ) : null}
      {enrollment ? (
        <Button
          class="btn btn-primary"
          type="submit"
          style={{ marginTop: "30px" }}
          onClick={enrol}
        >
          Enrolled
        </Button>
      ) : (
        <Button
          class="btn btn-primary"
          type="submit"
          style={{ marginTop: "30px" }}
          onClick={enrol}
        >
          Enrol
        </Button>
      )}
    </MDBCard>
  );
}
export default CourseDetails;
