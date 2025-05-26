import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Comment, ArticleDetailSkeleton } from '@/components/modules/articles';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ErrorView } from '@/components/partials';
import { GetArticlesDetail } from '@/service/api/article/article.query';

const ArticleContent = () => {
  const router = useRouter();
  const articleID = router.query.id;

  const {
    data: articleData,
    isFetching,
    isError,
    refetch,
  } = GetArticlesDetail(
    {
      id: articleID,
      'populate[user]': '*',
      'populate[comments][populate][user]': '*',
    },
    { queryKey: [articleID], enabled: articleID !== undefined }
  );

  const articleContent = articleData?.data;
  const articleComment = articleContent?.comments ?? [];

  const date = new Date(articleContent?.publishedAt ?? '');
  const monthName = date.toLocaleString('id-ID', { month: 'long' });
  const contentDate = `${date.getDate()} ${monthName}, ${date.getFullYear()}`;

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  if (isError) {
    return (
      <div className="px-80 my-20 desktop:px-20 tablet:px-10 phone:px-5">
        <ErrorView
          refetch={() => {
            refetch();
          }}
        />
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="px-80 mt-20 desktop:px-20 tablet:px-10 phone:px-5">
        <ArticleDetailSkeleton />
      </div>
    );
  }

  return (
    <div className="px-80 mt-20 desktop:px-20 tablet:px-10 phone:px-5">
      <h1 className="text-5xl w-2/3">{articleData?.data.title}</h1>

      <p className="text-sm text-[#757575] my-5">4 Mins Read</p>

      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-3 mt-4">
          <Avatar>
            <AvatarFallback>
              {articleContent?.user.username.split('')[0]}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="text-sm">{articleContent?.user.username}</p>
            <p className="text-sm">Author</p>
          </div>
        </div>

        <p className="text-sm">{contentDate}</p>
      </div>

      <Image
        src={
          isValidUrl(articleContent?.cover_image_url ?? '')
            ? articleContent?.cover_image_url ?? '/PNG/broken-image.png'
            : '/PNG/broken-image.png'
        }
        alt="cover"
        width="0"
        height="0"
        sizes="100vw"
        className="rounded-md bg-gray-300 object-cover w-full h-1/2 my-10"
      />

      <div>
        <p>{articleContent?.description}</p>

        <br />

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, eaque
          explicabo! Expedita impedit et, dignissimos magni ipsam iste? Qui unde
          aut rerum dolor excepturi illo accusantium, saepe quam iure sunt ut
          vel! Est, saepe? Totam ratione saepe voluptatum adipisci,
          reprehenderit odit doloribus animi dolor repudiandae incidunt!
          Accusantium quibusdam minus alias perspiciatis vero, magnam nulla
          reprehenderit harum aut error non! Nihil suscipit incidunt est quo
          aperiam sunt minima veniam, ipsum eveniet, quam natus esse enim omnis
          consequatur? Esse aspernatur voluptates temporibus alias optio,
          assumenda doloribus est illum sed earum autem ducimus explicabo! Ex in
          sint iusto placeat fuga qui ab debitis hic nobis quibusdam nulla alias
          omnis eveniet neque labore exercitationem harum quaerat perferendis,
          eligendi incidunt obcaecati. Saepe incidunt molestias tenetur,
          accusamus reiciendis optio voluptas, totam nulla voluptatibus in
          debitis ipsam nemo corrupti temporibus praesentium eveniet, maiores
          sunt voluptatum suscipit nam nisi. Suscipit provident placeat unde
          ducimus. Quibusdam ipsum itaque tenetur?
        </p>
      </div>

      <Comment
        articleID={articleContent?.id}
        comment={articleComment}
        refetch={() => {
          refetch();
        }}
      />
    </div>
  );
};

export default ArticleContent;
