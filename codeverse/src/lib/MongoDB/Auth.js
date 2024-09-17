import axios from "axios";

export const CreateUserAccountMutation = async (user) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/user/sign-up",
      user
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const SignInAccountMutation = async (user) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/user/sign-in",
      user
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
export const SignOutAccountMutation = async () => {
  try {
    await axios.post("http://localhost:5000/user/sign-out");
    // Optionally clear any local storage or client-side state
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
export async function getCurrentUser() {
  try {
    const response = await axios.get("/user/current"); // Adjust endpoint as per your server setup
    return response.data.user; // Assuming your server returns user data in 'user' field
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
}
