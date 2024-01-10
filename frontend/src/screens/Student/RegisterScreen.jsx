import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
// import FormContainer from "../components/FormContainer";
// import Loader from "../../components/mutualComponents/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../slices/userApiSlice";

// import { setCredentials } from "../../slices/authSlice";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,

  Checkbox,
  FormErrorMessage,
  VStack,
  Text,
} from "@chakra-ui/react";
// import { Field, Formik, ErrorMessage } from "formik";
import { InputGroup } from "react-bootstrap";

// import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
 
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);
 
  const submitHandler= async(e)=>{
debugger
    e.preventDefault();
    try {
      if (name.trim()||email.trim() || password.trim()) {
        
        const res = await register({ name,email, password }).unwrap();
        navigate("/login");
      } else {
        toast.error("Please Enter email and password");
      }
    } catch (err) {
     console.log(err);
    }
  }

  const googleHandler = async (decoded) => {
    const email = decoded.email;
    const name = decoded.name;
    try {
      const res = await register({ name, email, gmail: true }).unwrap();
     
      navigate("/login");
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
            Sign Up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Form onSubmit={submitHandler}>
            <Stack spacing={4}>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
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
                  Sign Up
                </Button>
              </Stack>
            </Stack>
          </Form>
          <br />
          <br />

          <div style={{ borderTop: "0.5px solid #000", width: "100%" }}></div>
          <br />
          <br />

          <h6 style={{ textAlign: "center" }}>Or Signup with</h6>
          <br />
          <GoogleOAuthProvider clientId="491369151018-90df2bi9i480ivns1lmojepi9p2r9vg1.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decoded = jwtDecode(credentialResponse.credential);
                googleHandler(decoded);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
          <Stack pt={6}>
            <Text align={"center"}>
              Already have an account?
              <Link to="/login" cursor={"pointer"} color={"blue.400"}>
                Login
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>

      <ToastContainer />
    </Flex>
  );
};

export default RegisterScreen;
