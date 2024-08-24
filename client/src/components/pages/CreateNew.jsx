import BlogForm from "../BlogForm"

const CreateNew = ({ addBlog, title, setTitle, author, setAuthor, url, setUrl, content, setContent}) => {
    return (
        <div className="container newform__wrapper">
                  <BlogForm
        addBlog={addBlog}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
        content= {content}
        setContent = {setContent}
      />
        </div>
    )
}

export default CreateNew