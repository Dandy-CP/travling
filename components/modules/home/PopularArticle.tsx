import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ErrorView } from '@/components/partials';
import { ArticleCardSkeleton, ArticlesCard } from '../articles';
import { GetArticles } from '@/service/api/article/article.query';

const PopularArticle = () => {
  const {
    data: articleResponse,
    isFetching,
    isError,
    refetch,
  } = GetArticles({
    'pagination[pageSize]': 3,
    'populate[user]': '*',
  });

  const articleList = articleResponse?.data ?? [];

  return (
    <div className="desktop:mt-20 tablet:mt-20 phone:mt-20">
      <div className="flex flex-row justify-between items-center phone:flex-col phone:items-start phone:gap-4">
        <div>
          <h1 className="text-5xl font-semibold mb-2 desktop:text-3xl tablet:text-2xl phone:text-3xl">
            Popular Article for you about all topic
          </h1>

          <p className="phone:text-sm">
            Ideas, trends, and inspiration for a brighter future
          </p>
        </div>

        <Link
          href="/article"
          className="flex flex-row items-center gap-2 cursor-pointer"
        >
          <p className="text-[#42A7C3] font-semibold">See all Article</p>
          <ChevronRight size={15} color="#42A7C3" />
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 my-20 tablet:flex tablet:flex-col phone:flex phone:flex-col">
        {articleList.map((value) => (
          <ArticlesCard key={value.id} value={{ ...value }} />
        ))}

        {isFetching && (
          <>
            {Array(3)
              .fill(3)
              .map((_, index) => (
                <ArticleCardSkeleton key={index} />
              ))}
          </>
        )}
      </div>

      {!isFetching && isError && (
        <div className="flex justify-center mb-20">
          <ErrorView
            refetch={() => {
              refetch();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PopularArticle;
