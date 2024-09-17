import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Heading,
  Box,
} from "@chakra-ui/react";
import * as yup from "yup";

 export const SignupValidation = yup.object().shape({
   firstName: yup.string().required("First name is required"),
   lastName: yup.string().required("Last name is required"),
   email: yup
     .string()
     .email("Invalid email address")
     .required("Email is required"),
   password: yup
     .string()
     .required("Password is required")
     .min(8, "Password must be at least 8 characters"),
 });
 export const PostValidation = yup.object().shape({
   caption: yup.string().required("Caption is required"),
   description: yup.string().required("Description is required"),
   images: yup
     .array()
     .of(yup.string().url("Must be a valid URL")) // Validate URLs for image paths
     .notRequired(), // Optional field
   videos: yup
     .array()
     .of(yup.string().url("Must be a valid URL")) // Validate URLs for video paths
     .notRequired(), // Optional field
   codeSnippets: yup.string().notRequired(), // Optional field
   projectUrl: yup.string().notRequired(), // Optional field
   location: yup.string().notRequired(), // Optional field
   tags: yup
     .array()
     .of(yup.string()) // Validate tags as strings
     .notRequired(), // Optional field
   techStack: yup
     .array()
     .of(yup.string()) // Validate tech stack as strings
     .notRequired(), // Optional field
 });