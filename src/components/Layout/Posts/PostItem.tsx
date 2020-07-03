import React, { Component } from 'react'
import { PostType, RootStateType } from '../../../types';
import { Link } from 'react-router-dom';
import Comment from './Comment';
import { createComment } from '../../../store/actions/posts';
import { connect } from 'react-redux';

interface OwnState {
    comment: string
}
interface StateProps{

}
interface DispatchProps{
    createComment: (content: string, postId: string) => void
}
interface OwnProps {
    post: PostType
}

type Props = StateProps & DispatchProps & OwnProps;


const initialState: OwnState = {
    comment:''
}

class PostItem extends Component<Props, OwnState> {
    constructor(props: Props){
        super(props);
        this.state = initialState;
    }
    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }
    handleAddComment = (e:React.KeyboardEvent<HTMLInputElement>) => {
        const { comment } = this.state;
        const { post } = this.props;
    
        if (e.key === 'Enter') {
          this.props.createComment(comment, post._id);
          // clear comment
          this.setState({
            comment: '',
          });
        }
      };
    
    render() {
        const {post} = this.props;
        return (
            <div className="post-wrapper" key={post._id}>
                <div className="post-header">
                <div className="post-avatar">
                    <Link to={`/user/${post.user._id}`}>
                    <img
                        src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                        alt="user-pic"
                    />
                    </Link>
                    <div>
                    <span className="post-author">{post.user.name}</span>
                    <span className="post-time">{post.createdAt.toLocaleString()}</span>
                    </div>
                </div>
                <div className="post-content">{post.content}</div>

                <div className="post-actions">
                    <div className="post-like">
                    <img
                        src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                        alt="likes-icon"
                    />
                    <span>{post.likes.length}</span>
                    </div>

                    <div className="post-comments-icon">
                    <img
                        src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                        alt="comments-icon"
                    />
                    <span>{post.comments.length}</span>
                    </div>
                </div>
                <div className="post-comment-box">
                    <input
                    placeholder="Start typing a comment"
                    onChange={this.handleInputChange}
                    name='comment'
                    onKeyPress={this.handleAddComment}
                    value={this.state.comment}
                    />
                </div>

                <div className="post-comments-list">
                    {post.comments.map((comment) => (
                        <Comment comment={comment} key={comment._id} postId={post._id} />
                    ))}
                </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state: RootStateType) => {
    return {
        
    }
}

const mapDispatchToProps:DispatchProps = {
    createComment
}


export default connect<StateProps, DispatchProps, OwnProps, RootStateType>(mapStateToProps, mapDispatchToProps)(PostItem)