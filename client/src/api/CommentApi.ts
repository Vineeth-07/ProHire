import { API_ENDPOINT } from "../config/constants";

export interface CommentData {
  id: number;
  comment: string;
  date: Date;
  userId: number;
  postId: number;
}

export const postComment = async (
  commnetData: CommentData,
  authToken: string | null
) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/comment/addcomment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(commnetData),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Adding comment failed");
    }
    return responseData;
  } catch (error) {
    console.error("Adding comment failed:", error);
    throw error;
  }
};

export const fetchComments = async (): Promise<CommentData[]> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/comment`, {
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
