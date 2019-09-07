import React, { PureComponent } from 'react';
import { Link } from "react-router-dom";
import './Posts.css';

class Posts extends PureComponent {
  constructor(props) {
    super(props);
  }

  getUserLink(post) {
    const { users } = this.props;
    const user = users.find(user => {
      return user.id === post.userId;
    });
    return (
      <Link className="link" to={`/user/${user.id}`}>{user.name}</Link>
    );
  }

  render() {
    const { posts, users } = this.props;
    return (
      <div className="posts">
        <div className="post-title-header header border-right border-bottom">Posts</div>
        <div className="post-author-header header border-bottom">Author</div>
        {
          posts && posts.length > 0 && users && users.length > 0 &&
          posts.map((post, index) => {
            return (
              <React.Fragment key={post.id}>
                <div className={`post-title border-right${index < posts.length - 1 ? ' border-bottom' : ''}`}><Link className="link" to={`/post/${post.id}`}>{post.title}</Link></div>
                <div className={`post-author${index < posts.length - 1 ? ' border-bottom' : ''}`}>{this.getUserLink(post)}</div>
              </React.Fragment>
            );
          })
        }
      </div>
    )
  }
}

export default Posts;