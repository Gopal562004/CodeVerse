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
import { useSignInAccountMutation } from "../../lib/react-query/queriesAndMutations";

const SigninForm = ({ onLogin }) => {
  const { mutateAsync: signInAccount, isLoading: isSigningIn } =
    useSignInAccountMutation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.target);
      const userCredentials = {
        identifier: formData.get("identifier"),
        password: formData.get("password"),
      };

      const data = await signInAccount(userCredentials);

      console.log("Signin successful:", data);

      // Store user data and token
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      // Call the onLogin function passed from App.js to update isLoggedIn state
      onLogin();

      // Redirect to home page after successful signin
      navigate("/");
    } catch (error) {
      console.error("Signin failed:", error);
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
          Sign in
        </Heading>
      </Box>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormControl isRequired>
          <FormLabel className="text-gray-600">Username or Email</FormLabel>
          <Input
            type="text"
            placeholder="Enter your Username or Email"
            name="identifier"
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
            "Sign in"
          )}
        </Button>
        <p className="text-small-regular text-light-2 text-center mt-2">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="text-primary-500 text-small-semibold ml-1"
          >
            Sign up
          </Link>
        </p>
      </form>
    </Box>
  );
};

export default SigninForm;
