import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import Button from '../../shared/components/FormElements/Button';
import './PostList.css';

const PostList = props => {
  if (props.items.length === 0) {
    return (
      <div className="post-list center">
        <Card>
          <h2>No post found. Maybe create one?</h2>
          <Button to="/post/new">Share Post</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="post-list">
      {props.items.map(post => (
        <PlaceItem
          key={post.id}
          id={post.id}
          image={post.image}
          title={post.title}
          description={post.description}
          address={post.address}
          creatorId={post.creator}
          coordinates={post.location}
          onDelete={props.onDeletePost}
        />
      ))}
    </ul>
  );
};

export default PostList;
