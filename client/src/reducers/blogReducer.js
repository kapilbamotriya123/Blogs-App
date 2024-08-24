import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { showNotification } from "./notificationReducer";

const blogSlice = createSlice({
    name: 'blog',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        updateBlog(state, action) {
            return state.map(b => b.id !== action.payload.id ? b : action.payload
            )
        },
        //expects only id in arg
        removeBlog(state, action) {
            return state.filter(b => b.id !== action.payload)
        }
    }
})

const {setBlogs, appendBlog, updateBlog, removeBlog} = blogSlice.actions

export const initialiseBlogs = () => {
    
    return async dispatch => {
        const blogs = await blogService.getAll()        
        dispatch(setBlogs(blogs))
    }
}

export const createBlog =(newBlog) => {
    return async dispatch => {
        const uploadedBlog = await blogService.create(newBlog)
        dispatch(appendBlog(uploadedBlog))
    }
}

export const likeBlog = (oldBlog) => {
    return async dispatch => {
      let updatedBlog = { ...oldBlog, likes: oldBlog.likes + 1 };
      updatedBlog = await blogService.update(updatedBlog)
      dispatch(updateBlog(updatedBlog))
    }
  }

  export const deleteBlog = (blog) => {
    return async dispatch => {
      if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
        try {
          const status = await blogService.deleteBlog(blog.id);
          if (status === 204) {
            dispatch(removeBlog(blog.id));
            dispatch(showNotification('Blog deleted successfully'));
          }
        } catch (exception) {
          const status = exception.response?.status;
          if (status === 401 || status === 403) {
            dispatch(showNotification('Only users who added the blog can delete it'));
          } else {
            dispatch(showNotification('An error occurred while deleting the blog post'));
          }
        }
      }
    };
  };
export default blogSlice.reducer