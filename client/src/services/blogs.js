import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.post(baseUrl, newBlog, config);
  return request.data;
};

const update = async (newBlog) => {
  const request = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog)
  return request.data
}
const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.status;
  } catch (error) {
    
    throw error;
  }
};

export default { getAll, create, update, setToken, deleteBlog };
