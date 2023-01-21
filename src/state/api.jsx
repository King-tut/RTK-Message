import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000"}),
    reducerPath: "messageApi",
    tagTypes: ["User","Message"],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `/users/${id}`,
            providesTags: ["User"]
        }),
        getSendingMessages: build.mutation({
            query: (payload) =>({
                url:"/messages",
                method: "POST",
                body: payload,
                headers: {
                    "Content-Type": "application/json"
                }

            }),
            invalidatesTags:["Message"],
            
        }),
        

        getUserMessage: build.query({
            query: (id) => `/show-messages/${id}`,
            providesTags:["Message"],
        }),
        
    })
})

//console.log(process.env.REACT_APP_BASE_URL)

export const {useGetUserQuery, useGetSendingMessagesMutation, useGetUserMessageQuery}  = api