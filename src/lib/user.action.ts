"use client";
import { PropesType } from "@/types/user.types";
import axios from "axios";

export async function storeData({ parseResult, userInfo }: PropesType) {
  const response = await axios.post(
    "http://localhost:3000/api/user",
    { parseResult, userInfo },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

export async function fetchInterview({ id }: { id: string }) {
  const response = await axios.get(`http://localhost:3000/api/interview/${id}`);
  return response.data;
}

export async function fetchAllInterviews({ id }: { id: string }) {
  try {
    if (!id) {
      return {
        success: false,
        message: "Id is required",
      };
    }

    const response = await axios.get(
      `http://localhost:3000/api/interview/all/${id}`
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Error while fetching interview data",
    };
  }
}
