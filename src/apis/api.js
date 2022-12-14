import axios from "axios";
import { getToken } from '../contexts/auth';

export const GetCourses = async () => {
  const token = await getToken();
  try {
    const data = await axios.get(
      `https://masterminds-api.herokuapp.com/v1/courses`, {
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

  try {
    const data = await axios.post(
      `https://masterminds-api.herokuapp.com/v1/courses`, body, {
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