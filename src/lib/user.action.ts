"use client";

import { PropesType } from "@/types/user.types";
import axios from "axios";
import toast from "react-hot-toast";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_BASE_URL;

export async function createInterview({ parseResult, userInfo }: PropesType) {
  try {
    const response = await axios.post(
      `${baseUrl}/api/interview`,
      { parseResult, userInfo },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error creating interview:", error);
    toast.error(error?.response?.data?.message || "Failed to create interview");
    throw error;
  }
}

export async function fetchAllInterviews({ id }: { id: string }) {
  try {
    if (!id) throw new Error("Id is required");

    const response = await axios.get(`${baseUrl}/api/interview/all/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch interviews");
    }

    return response.data.interviews;
  } catch (error: any) {
    console.error("Error fetching all interviews:", error);
    toast.error(error?.message || "Something went wrong fetching interviews");
    return [];
  }
}

export async function fetchInterview({ id }: { id: string }) {
  try {
    const response = await axios.get(`${baseUrl}/api/interview/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching interview:", error);
    toast.error(error?.response?.data?.message || "Failed to fetch interview");
    throw error;
  }
}

export async function updateQuestionStatus({
  questionId,
  AIfeedback,
}: {
  questionId: string;
  AIfeedback: string;
}) {
  try {
    const response = await axios.put(
      `${baseUrl}/api/interview/${questionId}`,
      { AIfeedback },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast.success("You can now answer the next question!");
    return response.data;
  } catch (error: any) {
    console.error("Error updating question status:", error);
    toast.error(
      error?.response?.data?.message ||
        "Failed to update question status. Try again."
    );
    throw error;
  }
}
