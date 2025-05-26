import React from 'react';

const ArticleCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 w-full h-[250px] rounded-md" />

      <div className="flex flex-row items-center gap-3 mt-4">
        <div className="size-10 rounded-full bg-gray-200" />
        <div className="w-[100px] h-[15px] rounded-md bg-gray-200" />
        <div className="w-[100px] h-[15px] rounded-md bg-gray-200" />
      </div>

      <h1 className="my-3 text-2xl font-semibold truncate hover:text-blue-500 cursor-pointer">
        <div className="w-[350px] h-[20px] rounded-md bg-gray-200" />
      </h1>

      <div className="flex flex-col gap-3">
        <div className="w-1/2 h-[15px] rounded-md bg-gray-200" />
        <div className="w-2/3 h-[15px] rounded-md bg-gray-200" />
        <div className="w-full h-[15px] rounded-md bg-gray-200" />
      </div>
    </div>
  );
};

export default ArticleCardSkeleton;
