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
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CourseHome = () => {
  const [list, setList] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/student/getCourse`);
      setList(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
const navigate= useNavigate()
  const detailPage=async(postId)=>{
    try{
      navigate(`/courseDetails/${postId}`);
      
    }catch(err){
      console.log(err);
    }
  }
  return (
    <>
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
                  <Heading size="md">{course.courseName}</Heading>

                  <Text style={{ textOverflow:"ellipsis",whiteSpace:"nowrap",overflow: "hidden", maxWidth: '500px' }}>
                    {course.description}
                  </Text>
                  <Text >
                    <strong>{new Date(course.date).toLocaleDateString("en-GB")}</strong>
                  </Text>
                  <Text >
                    <strong>{course.time}</strong>
                  </Text>
                  <Button variant="solid" colorScheme="blue" onClick={()=>detailPage(course._id)}>
                    See details
                  </Button>
                </CardBody>

                
              </Stack>
            </Card>
          ))
        : null}
    </>
  );
};

export default CourseHome;
