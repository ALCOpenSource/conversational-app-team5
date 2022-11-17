import axios from "axios";


const token =  localStorage.getItem("token");

export const GetCourses = async () => {
    try {
        const data = await axios.get(`https://masterminds-api.herokuapp.com/v1/courses`, 
            {
              headers: { 
                  "Authorization": token
              },
            })
          console.log("Get Courses",data);
           return data; 
          } catch (error) {
              console.log(error)  
          }
  }

  export const PostCourses = async (body) => {
    try {
        const data = await axios.post(`https://masterminds-api.herokuapp.com/v1/courses`, body, 
            {
              headers: { 
                  "Authorization": token
              },
            })
          console.log("Post Courses",data);
           return data; 
          } catch (error) {
              console.log(error)  
          }
  }