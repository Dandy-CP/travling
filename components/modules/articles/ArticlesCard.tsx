import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/hooks';
import { ArticleType } from '@/types/article.types';

interface ArticleProps {
  value: ArticleType;
}

const ArticlesCard = ({ value }: ArticleProps) => {
  const { authData } = useAuth();

  const { title, description, cover_image_url, publishedAt, documentId, user } =
    value;

  const date = new Date(publishedAt);
  const monthName = date.toLocaleString('id-ID', { month: 'long' });
  const publishedDate = `${date.getDate()} ${monthName}, ${date.getFullYear()}`;

  const initialName = user?.username.split('')[0].toUpperCase();

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="w-full">
      <Image
        src={
          isValidUrl(cover_image_url)
            ? cover_image_url
            : '/PNG/broken-image.png'
        }
        alt="cover"
        width="0"
        height="0"
        sizes="100vw"
        className="rounded-md bg-gray-300 object-cover w-full h-[300px]"
      />

      <div className="flex flex-row items-center gap-2 mt-4">
        {initialName && (
          <>
            <Avatar>
              <AvatarFallback>{initialName}</AvatarFallback>
            </Avatar>

            <p className="text-sm font-semibold">{user?.username}</p>
          </>
        )}

        <p className="text-sm">{publishedDate}</p>
      </div>

      <Link href={authData ? `/article/${documentId}` : '/auth'}>
        <p className="my-3 text-2xl font-semibold truncate hover:text-blue-500 cursor-pointer">
          {title.length !== 0
            ? title
            : 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum, facere?'}
        </p>
      </Link>

      <p className="line-clamp-3">
        {description.length !== 0
          ? description
          : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi magnam aut quod nostrum quaerat iusto eius maxime natus recusandae atque.'}
      </p>
    </div>
  );
};

export default ArticlesCard;
