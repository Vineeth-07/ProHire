import { API_ENDPOINT } from "../config/constants";

export interface UserData {
  id: number;
  name: string;
  gender: string;
  qualification: string;
  email: string;
  password: string;
  savedJobs: (string | number)[];
}

export const fetchUserData = async (): Promise<UserData[]> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchAllUsers = async (): Promise<UserData[]> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/user/allusers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
