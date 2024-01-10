import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";

import "bootstrap/dist/css/bootstrap.min.css";

import LoginScreen from "./screens/Student/loginScreen.jsx";
import RegisterScreen from "./screens/Student/RegisterScreen.jsx";
import Home from "./screens/Student/Home.jsx";
import CourseList from "./screens/Student/CourseList.jsx";
import CourseDetails from "./screens/Student/CourseDetails.jsx";
import EnrolledCourses from "./screens/Student/EnrolledCourses.jsx";

import LoginAdminScreen from "./screens/Admin/LoginScreen.jsx";
import HomeAdminScreen from "./screens/Admin/HomeAdminScreen.jsx";
import AdminCourseList from "./screens/Admin/AdminCourseList.jsx";
import AdminCategory from "./screens/Admin/AdminCategory.jsx";
import Course from "./screens/Student/Course.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/" element={<App admin={false} />}>
        <Route path="/" element={<Home />} />
        <Route path="/course" element={<CourseList />} />
        <Route path="/courseDetails/:postId" element={<CourseDetails />} />
        <Route path="/enrolledList" element={<EnrolledCourses />} />
        <Route path="/startCourse" element={<Course />} />
      </Route>
      <Route path="/admin/login" element={<LoginAdminScreen />} />
      <Route path="/" element={<App admin={true} />}>
        <Route path="/admin/" element={<HomeAdminScreen />} />
        <Route path="/admin/courseList" element={<AdminCourseList/>} />
        <Route path="/admin/category" element={<AdminCategory/>} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <Provider store={store}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>
  </ChakraProvider>
);
