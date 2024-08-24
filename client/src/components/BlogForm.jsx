const BlogForm = (props) => {
  return (
    <div className="new__wrapper">
      <h2 className="new__heading">Create New Blog</h2>
      <form onSubmit={props.addBlog}>
        <div>
          <p className="form__fieldname">
            title
          </p>
          <input className="form__input"
            name="title"
            type="text"
            value={props.title}
            onChange={(event) => props.setTitle(event.target.value)}
          />
        </div>

        <div>
          <p className="form__fieldname">
            author
          </p>
          <input className="form__input"
            name="author"
            type="text"
            value={props.author}
            onChange={(event) => props.setAuthor(event.target.value)}
          />
        </div>
        <div>
          <p className="form__fieldname">
            URL
          </p>
          <input className="form__input"
            name="url"
            type="text"
            value={props.url}
            onChange={(event) => props.setUrl(event.target.value)}
          />
        </div>
        <div>
          
          <p className="form__fieldname">
            Content
          </p>
          <textarea className="form__input form__content"
            name="content"
            type="text"
            value={props.content}
            onChange={(event) => props.setContent(event.target.value)}
          />
        </div>
        <button className="nav__btn new__btn" type="submit">create</button>
      </form>
    </div>
  );
};
export default BlogForm;
