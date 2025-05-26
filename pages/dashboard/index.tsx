import React, { useState } from 'react';
import { Statistic } from '@/components/modules/dashboard';
import { ArticleTable } from '@/components/modules/dashboard';
import { ErrorView } from '@/components/partials';
import { GetArticles } from '@/service/api/article/article.query';

const DashboardPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: articleResponse,
    isFetching,
    isError,
    refetch,
  } = GetArticles(
    {
      'pagination[page]': currentPage,
      'pagination[pageSize]': 10,
      'populate[user]': '*',
    },
    {
      queryKey: [currentPage],
    }
  );

  const articleData = articleResponse?.data ?? [];
  const articleMeta = articleResponse?.meta;
  const pageCount = articleMeta?.pagination.pageCount ?? 0;

  return (
    <div>
      <Statistic totalArticle={articleMeta?.pagination.total ?? 0} />

      <div className="mt-10">
        <ArticleTable
          articleData={articleData}
          currentPage={currentPage}
          pageCount={pageCount}
          isFetching={isFetching}
          setCurrentPage={setCurrentPage}
          refetch={() => {
            refetch();
          }}
        />

        {!isFetching && isError && (
          <ErrorView
            refetch={() => {
              refetch();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
