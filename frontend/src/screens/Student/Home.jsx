import React from "react";
import { Flex } from "@chakra-ui/react";
import CourseHome from "../../components/Students/CourseHome";

const Home = () => {
  return (
    <div>
      <Flex style={{ width: "100%", justifyContent: "space-between" }}>
        <div style={{ width: "250px" }}></div>
        <Flex flexDirection={{ md: "column", base: "column" }}>
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            
          </div>
          <CourseHome />
        </Flex>
        <div style={{ width: "350px" }}>
          {/* <Chat /> */}
        </div>
      </Flex>
    </div>
  );
};

export default Home;
