import React, { PureComponent } from 'react';
import { Link } from "react-router-dom";
import './Post.css';

class Post extends PureComponent {
  constructor(props) {
    super(props);
    const { posts, users, match } = this.props;
    this.postId = match.params.id;
    const post = posts.find(post => { return post.id == this.postId });
    const user = post ? users.find(user => { return user.id == post.userId }) : null;
    this.state = {
      post,
      user,
      username: user ? user.username : '',
      comments: null,
      postComments: null
    };
  }

  componentDidMount() {
    this._mounted = true;
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(json => (() => {
        if (this._mounted) {
          this.setState({ comments: json }, () => {
          this.getPostComments();
        });
        }
      })());
  }

  componentDidUpdate(prevProps) {
    const { posts, users } = this.props;
    if (prevProps.posts !== posts && posts) {
      (() => {
        this.setState({ post: posts.find(post => { return post.id == this.postId }) }, () => {
          this.getUsername();
          this.getPostComments();
        });
      })();
    }
    if (prevProps.users !== users && users) {
      (() => {
        this.setState({ user: this.state.post ? users.find(user => { return user.id == this.state.post.userId }) : null }, () => {
          this.getUsername();
        });
      })();
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  getPostComments() {
    const { post, comments } = this.state;
    if (post && post.id && comments) {
      const postComments = comments.filter(comment => { return comment.postId == post.id });
      this.setState({ postComments });
    }
  }

  getUsername() {
    const { user, post, postComments } = this.state;
    const { users } = this.props;
    if (user && user.username) {
      this.setState({ username: user.username });
    } else if (post && users) {
      const author = users.find(user => { return user.id == post.userId });
      this.setState({ username: author.username });
    }
  }

  render() {
    const { post, username, postComments } = this.state;
    return (
      <div>
        <Link className="back-link" to="/">Back to all posts</Link>
        {
          post &&
          <React.Fragment>
            <div>Title: {post.title}</div>
            <div>Author: {username}</div>
          </React.Fragment>
        }
        {
          postComments &&
          <div className="comments">
            <div className="comment-title-header header border-right border-bottom">Subject</div>
            <div className="comment-email-header header border-right border-bottom">Email</div>
            <div className="comment-body-header header border-bottom">Comment</div>
            {
              postComments.map((comment, index) => {
                return (
                  <React.Fragment key={comment.id}>
                    <div className={`comment-title border-right${index < postComments.length - 1 ? ' border-bottom' : ''}`}>{comment.name}</div>
                    <div className={`comment-email border-right${index < postComments.length - 1 ? ' border-bottom' : ''}`}>{comment.email}</div>
                    <div className={`comment-body${index < postComments.length - 1 ? ' border-bottom' : ''}`}>{comment.body}</div>
                  </React.Fragment>
                );
              })
            }
          </div>
        }
      </div>
    )
  }
}

export default Post;