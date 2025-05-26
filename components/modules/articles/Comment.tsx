import React from 'react';
import CommentInput from './partials/CommentInput';
import CommentBox from './partials/CommentBox';
import { CommentType } from '@/types/article.types';

interface CommentProps {
  articleID?: number;
  comment: CommentType[];
  refetch: () => void;
}

const Comment = ({ comment, articleID, refetch }: CommentProps) => {
  return (
    <div className="w-full shadow-md p-5 my-20 rounded-md border border-muted">
      <h1 className="text-3xl font-semibold">Comments</h1>

      <CommentInput
        articleID={articleID}
        refetch={() => {
          refetch();
        }}
      />

      <div className="mt-10">
        {comment.map((value) => (
          <CommentBox key={value.id} comment={{ ...value }} />
        ))}
      </div>
    </div>
  );
};

export default Comment;
