"use client";
import { PropesType } from "@/types/user.types";
import axios from "axios";

export async function createInterview({ parseResult, userInfo }: PropesType) {
  const response = await axios.post(
    "http://localhost:3000/api/interview",
    { parseResult, userInfo },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

export async function fetchAllInterviews({ id }: { id: string }) {
  try {
    if (!id) {
      throw new Error("Id is required");
    }

    const response = await axios.get(
      `http://localhost:3000/api/interview/all/${id}`
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch interviews");
    }

    return response.data.interviews;
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return [];
  }
}

export async function fetchInterview({ id }: { id: string }) {
  const response = await axios.get(`http://localhost:3000/api/interview/${id}`);
  return response.data;
}

export async function updateQuestionStatus({
  questionId,
}: {
  questionId: string;
}) {
  const response = await axios.put(
    `http://localhost:3000/api/interview/${questionId}/question`
  );
  console.log("response.data : ", response.data);
  return response.data;
}
