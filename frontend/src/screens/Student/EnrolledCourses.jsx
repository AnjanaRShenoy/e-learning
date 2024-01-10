import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Button,
  Image,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEnrolMutation } from "../../slices/userApiSlice";

const EnrolledCourses = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [list, setList] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/student/getEnrolledList`, {
        params: {
          userInfo: userInfo,
        },
      });
      setList(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const navigate = useNavigate();
  const detailPage = async (postId) => {
    try {
      navigate(`/courseDetails/${postId}`);
    } catch (err) {
      console.log(err);
    }
  };

  const [enrolCourse] = useEnrolMutation();
  const enrol = async (postId) => {
    try {
      const res = await enrolCourse({ userInfo, postId }).unwrap();
      fetchData()
      
    } catch (err) {
      console.log(err);
    }
  };

 
  const startCourse = async (postId) => {
    debugger
    try {        
        const res = await axios.post(`/api/student/startCourse`, {
            params: {
              _id: postId,
              userInfo: userInfo,
            },
          });
          navigate("/startCourse")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Flex direction="column">
        {list
          ? list.map((course) => (
              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                minW="700px"
                marginBottom="30px"
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                  alt="Caffe Latte"
                  maxH="300px"
                />

                <Stack>
                  <CardBody>
                    <Heading size="md">{course.course.courseName}</Heading>

                    <Text
                      style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        maxWidth: "500px",
                      }}
                    >
                      {course.course.description}
                    </Text>
                    <Text>
                      <strong>
                        {new Date(course.course.date).toLocaleDateString(
                          "en-GB"
                        )}
                      </strong>
                    </Text>
                    <Text>
                      <strong>{course.course.time}</strong>
                    </Text>
                    <Button
                      variant="solid"
                      colorScheme="blue"
                      onClick={() => enrol(course.course._id)}
                      style={{ marginRight: "4px" }}
                    >
                      Unenrol
                    </Button>
                    <Button
                      variant="solid"
                      colorScheme="blue"
                      onClick={() => startCourse(course.course._id)}
                    >
                      Start Course
                    </Button>
                  </CardBody>
                </Stack>
              </Card>
            ))
          : null}
      </Flex>
    </>
  );
};

export default EnrolledCourses;
