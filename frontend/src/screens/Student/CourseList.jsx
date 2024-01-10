import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Flex,
  } from "@chakra-ui/react";

  import { useState, useEffect } from "react";
  import { Button, CardTitle } from "react-bootstrap";
  import axios from "axios";

  
  const CourseList = () => {
  
    const [list, setList]=useState("")
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/student/getCourse`);
        setList(res.data)
        console.log(res.data);
       
      } catch (err) {
        console.log(err);
      }
    };
  
  useEffect(()=>{
    fetchData()
  },[])

    return (
      <Flex flexDirection={"column"}>
        <CardTitle align={"center"} justify={"center"} style={{ color: "white" }}>
          <h2>Courses</h2>
        </CardTitle>
        <br />
        <TableContainer style={{ backgroundColor: "white", width:"900px" ,overflow: "hidden"}}>
          <Table >
            {/* <TableCaption>User table</TableCaption>3 */}
  
            <Thead>
              <Tr>
                <Th  style={{ width: '20%' }}>Name</Th>
                <Th  style={{ width: '10%' }}>Date</Th>
                <Th  style={{ width: '10%' }}>Time</Th>
                <Th  style={{  maxWidth: '30px' }}>Description</Th>
                <Th  style={{ width: '10%' }}>No. of Enrollment</Th>
              </Tr>
            </Thead>
            <Tbody>
              {list
                ? list.map((course) => (
                    <Tr>
                      <Td>{course.courseName}</Td>
                      <Td>{new Date(course.date).toLocaleDateString("en-GB")}</Td>
                      <Td>{course.time}</Td>
                      <Td style={{ textOverflow:"ellipsis",whiteSpace:"nowrap",overflow: "hidden", maxWidth: '30px' }}>{course.description}</Td>
                      <Td>{course.enrollment}</Td>
                      
  
                      {/* <Td>
                        {users.isBlocked ? (
                          <Button onClick={() => blockUser(users._id, "unblock")}>
                            Unblock
                          </Button>
                        ) : (
                          <Button onClick={() => blockUser(users._id, "block")}>
                            Block
                          </Button>
                        )}
                      </Td> */}
                    </Tr>
                  ))
                : null}
            </Tbody>
          </Table>
         
        </TableContainer>
      </Flex>
    );
  };
  export default CourseList;