import { ADMIN_URL, USERS_URL } from "../../constants/constants";
import { apiSlice } from "./apiSlice";

export const userAdminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    enrol: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/enroll`,
        method: "POST",
        body: data,
      }),
    }),

    
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/api/student/updateProfile`,
        method: "POST",
        body: data,
      }),
    }),

    // updateProfileImage: builder.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}/profile-updateImage`,
    //     method: "PUT",
    //     body: data,
    //   }),
    // }),

    // adminLogin: builder.mutation({
    //   query: (data) => ({
    //     url: `${ADMIN_URL}/auth`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    // listUsers: builder.mutation({
    //   query: (data) => ({
    //     url: `${ADMIN_URL}/list-users`,
    //     method: "GET",
    //     body: data,
    //   }),
    // }),
    // searchUsers: builder.mutation({
    //   query: (data) => ({
    //     url: `${ADMIN_URL}/search-users`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    // deleteUser: builder.mutation({
    //   query: (data) => ({
    //     url: `${ADMIN_URL}/delete-user`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    // getUser: builder.mutation({
    //   query: (data) => ({
    //     url: `${ADMIN_URL}/get-user`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    // editUser: builder.mutation({
    //   query: (data) => ({
    //     url: `${ADMIN_URL}/edit-user`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    // adminLogout: builder.mutation({
    //   query: () => ({
    //     url: `${USERS_URL}/logout`,
    //     method: "POST",
    //   }),
    }),
  })


export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useEnrolMutation,
  useUpdateUserMutation,
  
} = userAdminApiSlice;
