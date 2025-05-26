import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { CommentType } from '@/types/article.types';

interface Props {
  comment: CommentType;
}

const CommentBox = ({ comment }: Props) => {
  const { user, publishedAt, content } = comment;
  const { username } = user;

  const date = new Date(publishedAt);
  const monthName = date.toLocaleString('id-ID', { month: 'long' });
  const commentDate = `${date.getDate()} ${monthName}, ${date.getFullYear()}`;

  return (
    <div>
      <div>
        <div className="flex flex-row items-center gap-3">
          <Avatar>
            <AvatarFallback>{username.split('')[0]}</AvatarFallback>
          </Avatar>
          <p className="text-sm font-semibold">{username}</p>
        </div>

        <p className="mt-5">{content}</p>
      </div>

      <div className="flex flex-row items-center gap-3 mt-3">
        <div className="flex flex-row items-center gap-3">
          <ThumbsUp size={17} className="cursor-pointer" />
          <ThumbsDown size={17} className="cursor-pointer" />
        </div>

        <p className="text-sm font-semibold">{commentDate}</p>
      </div>

      <hr className="my-5" />
    </div>
  );
};

export default CommentBox;
