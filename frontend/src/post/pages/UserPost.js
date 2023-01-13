import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UserPost = () => {
  const [loadedPost, setLoadedPost] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/post/user/${userId}`
        );
        setLoadedPost(responseData.post);
      } catch (err) {}
    };
    fetchPost();
  }, [sendRequest, userId]);

  const postDeletedHandler = deletedPostId => {
    setLoadedPost(prevPost =>
      prevPost.filter(post => post.id !== deletedPostId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPost && (
        <PostList items={loadedPost} onDeletePost={postDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default UserPost;
