import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Box,
} from "@chakra-ui/react";
import Loader from "../../components/shared/Loader";
import { useCreateUserAccountMutation } from "../../lib/react-query/queriesAndMutations";

const SignupForm = () => {
  const { mutateAsync: createUserAccount, isLoading: isCreatingUser } =
    useCreateUserAccountMutation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.target);
      const userData = {
        name: formData.get("name"),
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
      };

      const data = await createUserAccount(userData);

      console.log("Signup successful:", data);

      // Store user data and token
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      // Redirect to home page after successful signup
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={6}
      borderWidth=""
      rounded="lg"
      className="shadow-md rounded-md"
    >
      <Box display="flex" alignItems="center" gap="50px">
        <div className="flex items-center">
          <img
            className="w-16 rounded-md"
            src="/assets/images/codeverselogo.png"
            alt="CodeVerse Logo"
          />
        </div>
        <Heading as="h2" size="lg" className="text-gray-800">
          Signup
        </Heading>
      </Box>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormControl isRequired>
          <FormLabel className="text-gray-600">Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter your Name"
            name="name"
            className="px-6 py-2 rounded-md text-white focus:outline-none focus:border-blue-500 bg-slate-900 shadow-input"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel className="text-gray-600">Username</FormLabel>
          <Input
            placeholder="Username"
            name="username"
            className="px-6 py-2 rounded-md text-white focus:outline-none focus:border-blue-500 bg-slate-900 shadow-input"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel className="text-gray-600">Email address</FormLabel>
          <Input
            type="email"
            placeholder="Email address"
            name="email"
            className="px-6 py-2 rounded-md text-white focus:outline-none focus:border-blue-500 bg-slate-900 shadow-input"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel className="text-gray-600">Password</FormLabel>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            className="px-6 py-2 rounded-md text-white focus:outline-none focus:border-blue-500 bg-slate-900 shadow-input"
          />
        </FormControl>
        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          className="w-full bg-custom-blue text-white px-6 py-3 rounded-md shadow-md"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <Loader />
              <span className="ml-2">Loading...</span>
            </div>
          ) : (
            "Sign up"
          )}
        </Button>
        <p className="text-small-regular text-light-2 text-center mt-2">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="text-primary-500 text-small-semibold ml-1"
          >
            Login
          </Link>
        </p>
      </form>
    </Box>
  );
};

export default SignupForm;
