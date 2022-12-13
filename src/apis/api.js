import axios from "axios";
import { getToken } from '../contexts/auth';

const token = localStorage.getItem("token");

export const GetCourses = async () => {
  try {
    const data = await axios.get(
      `https://conversational-app-team-5.herokuapp.com/v1/courses`, {
      headers: {
          "Authorization": token
      },
    });
    console.log("Get Courses",data);
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const PostCourses = async (body) => {
  const token = await getToken();

  console.log(token)

  try {
    const data = await axios.post(
      `https://conversational-app-team-5.herokuapp.com/v1/courses`, body, {
      headers: {
        "Authorization": token
      },
    });
    console.log("Post Courses",data)
    return data;
  } catch (error) {
    console.log(error)
    return error;
  }
}