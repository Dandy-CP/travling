import React from 'react';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks';
import { PostComment } from '@/service/api/comment/comment.mutation';
import { CommentSchema } from '@/schema/comment.schema';
import { CommentBody } from '@/types/comment.types';

interface Props {
  articleID?: number;
  refetch: () => void;
}

const CommentInput = ({ articleID, refetch }: Props) => {
  const { authData } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentBody>({
    resolver: zodResolver(CommentSchema),
  });

  const { mutateAsync, isPending } = PostComment({
    onSuccess() {
      refetch();
      reset();
      toast.success('Comment has been posted');
    },
    onError(error) {
      toast.error(error.response.data.error.message);
    },
  });

  const onSubmit: SubmitHandler<CommentBody> = (data) => {
    mutateAsync({
      content: data.content,
      article: articleID,
    });
  };

  return (
    <div className="border border-[#0089FF] rounded-md p-5 mt-10">
      <div className="flex flex-row items-center gap-3">
        <Avatar>
          <AvatarFallback>
            {authData?.username.split('')[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <p className="text-sm font-semibold">{authData?.username}</p>
      </div>

      <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
        <Input
          variant="textarea"
          rows={8}
          errorMessage={errors.content?.message}
          {...register('content')}
        />

        <hr className="my-5" />

        <Button variant="secondary" className="w-full" disabled={isPending}>
          Comment
        </Button>
      </form>
    </div>
  );
};

export default CommentInput;
