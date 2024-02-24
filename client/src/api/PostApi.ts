import { API_ENDPOINT } from "../config/constants";

export interface PostData {
  id: number;
  title: string;
  company: string;
  description: string;
  location: string;
  salary: string;
  date: Date;
  deadline: Date;
  experience: string;
  applications: string;
}

interface JobData {
  title: string;
  company: string;
  description: string;
  location: string;
  salary: string;
  deadline: Date;
  experience: string;
  applications: string;
}

export const fetchPostData = async (): Promise<PostData[]> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/post`, {
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

export const postJobData = async (
  jobData: JobData,
  authToken: string | null
) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/post/createpost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(jobData),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Posting job failed");
    }
    return responseData;
  } catch (error) {
    console.error("Posting job failed:", error);
    throw error;
  }
};

export const applyJob = async (postId: number, userId: number) => {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/post/${postId}/apply/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ postId, userId }),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Applying job failed");
    }
    return responseData;
  } catch (error) {
    console.error("Applying job failed:", error);
    throw error;
  }
};

export const saveJob = async (postId: number, userId: number) => {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/post/${postId}/save/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ postId, userId }),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Saving job failed");
    }
    return responseData;
  } catch (error) {
    console.error("Saving job failed:", error);
    throw error;
  }
};
