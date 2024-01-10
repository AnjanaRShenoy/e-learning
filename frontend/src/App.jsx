import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import AdminSidebar from "./components/Admin/AdminSidebar";
import UserSidebar from "./components/Students/UserSidebar";
import "react-toastify/dist/ReactToastify.css";

function App({ admin }) {
  return (
    <Flex flexDirection={{ md: "column", base: "column" }}>
      {admin ? <AdminSidebar /> : <UserSidebar />}
      <ToastContainer />
      <Flex py={10} className="hel" justifyContent={{ base: "space-around" , md:"space-around"}} style={{backgroundColor:"black", minHeight:"100vh"}}>
      <Outlet />
      </Flex>
    </Flex>
  );
}

export default App;
