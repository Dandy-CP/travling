import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  ArticlesCard,
  ArticleCardSkeleton,
} from '@/components/modules/articles';
import { ErrorView } from '@/components/partials';
import { GetArticles } from '@/service/api/article/article.query';
import { ArticleType } from '@/types/article.types';

const ArticlePage = () => {
  const [articleList, setArticleList] = useState<ArticleType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: articleResponse,
    isFetching,
    isError,
    refetch,
  } = GetArticles(
    {
      'pagination[page]': currentPage,
      'pagination[pageSize]': 12,
      'populate[user]': '*',
    },
    {
      queryKey: [currentPage],
    }
  );

  const articleData = articleResponse?.data ?? [];
  const articleMeta = articleResponse?.meta;

  useEffect(() => {
    if (!isFetching) {
      setArticleList((prev) => [...prev, ...articleData]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, isFetching]);

  return (
    <div className="mt-20 px-15 desktop:px-10 tablet:px-10 phone:p-5 phone:mt-5">
      <h1 className="text-center font-bold text-5xl phone:text-2xl">
        Exploring New Articles
      </h1>

      <p className="text-center my-5">
        Ideas, trends, and inspiration for a brighter future
      </p>

      <div className="px-15 my-20 grid grid-cols-3 gap-10 desktop:p-0 tablet:p-0 tablet:flex tablet:flex-col phone:flex phone:flex-col phone:p-0">
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

      {!isError && (
        <div className="flex justify-center mb-20">
          <Button
            className="p-5 w-1/2"
            variant="secondary"
            disabled={
              isFetching || articleMeta?.pagination.pageCount === currentPage
            }
            onClick={() => {
              setCurrentPage((prev) => prev + 1);
            }}
          >
            {articleMeta?.pagination.pageCount === currentPage
              ? 'End Of Article'
              : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ArticlePage;
