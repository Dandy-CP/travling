import React from 'react';

const ArticleDetailSkeleton = () => {
  return (
    <div className="animate-pulse mb-20">
      <div className="flex flex-col gap-3">
        <div className="bg-gray-200 w-full h-[35px] rounded-md" />
        <div className="bg-gray-200 w-1/2 h-[35px] rounded-md" />
        <div className="bg-gray-200 w-2/6 h-[35px] rounded-md" />
      </div>

      <div className="flex flex-row items-center gap-4 mt-3">
        <div className="bg-gray-200 size-10 rounded-full" />
        <div className="bg-gray-200 w-2/6 h-[20px] rounded-md" />
      </div>

      <div className="bg-gray-200 w-full h-[500px] rounded-md mt-5" />

      {Array(5)
        .fill(5)
        .map((_, index) => (
          <div key={index} className="flex flex-col gap-4 mt-5">
            <div className="bg-gray-200 w-full h-[25px] rounded-md" />
            <div className="bg-gray-200 w-1/2 h-[25px] rounded-md" />
            <div className="bg-gray-200 w-2/6 h-[25px] rounded-md" />
          </div>
        ))}
    </div>
  );
};

export default ArticleDetailSkeleton;
