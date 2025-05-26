import React from 'react';

interface Props {
  totalArticle: number;
}

const Statistic = ({ totalArticle }: Props) => {
  return (
    <div>
      <p className="font-semibold mb-5 text-xl">Statistic</p>

      <div className="border border-muted shadow-md rounded-md p-5">
        <p className="font-bold text-gray-400">Total Articles</p>
        <p className="font-bold text-4xl">{totalArticle}</p>
      </div>
    </div>
  );
};

export default Statistic;
