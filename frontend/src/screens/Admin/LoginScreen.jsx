import { useState, useEffect } from "react";
import { Form, useNavigate } from "react-router-dom";
// import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import { useAdminLoginMutation } from "../../slices/adminApiSlice";
// import { setCredentials } from "../../slices/authSlice";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { setAdminCredentials } from "../../slices/adminAuthSlice";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const LoginAdminScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useAdminLoginMutation();
  const { adminInfo } = useSelector((state) => state.adminAuth);
  
  useEffect(() => {
    if (adminInfo) {
      navigate("/admin/");
    }
  }, [navigate, adminInfo]);

  const submitHandler = async (e) => {
    debugger
    e.preventDefault();
    try {
      if (email.trim() || password.trim()) {
        const res = await login({ email, password }).unwrap();
        dispatch(setAdminCredentials({ ...res }));
        navigate("/admin/");
      } else {
        toast.error("Empty fields, please enter input value");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };


  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      style={{
        backgroundImage:
          'linear-gradient(rgba(255, 255, 255, 0.80), rgba(255, 255, 255, 0.4)), url("https://c4.wallpaperflare.com/wallpaper/646/235/690/icons-social-media-social-media-wallpaper-preview.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
           Admin Login
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          // style={{border:"2px solid black"}}
        >
          <Form onSubmit={submitHandler}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={password ? "text" : "password"}
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <Button
                    variant={"ghost"}
                    onClick={() => setPassword((Password) => !Password)}
                  >
                    {password ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Login
                </Button>
              </Stack>
            </Stack>
          </Form>
        </Box>
      </Stack>
      <ToastContainer />
    </Flex>
  );
};

export default LoginAdminScreen;
