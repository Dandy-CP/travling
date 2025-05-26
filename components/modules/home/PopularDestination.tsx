import React from 'react';
import CardDestination from './partials/CardDestination';
import { ChevronRight } from 'lucide-react';

const PopularDestination = () => {
  return (
    <div className="mt-25">
      <div className="flex flex-row justify-between items-center phone:flex-col phone:items-start phone:gap-3">
        <div>
          <h1 className="text-4xl font-semibold mb-2 phone:text-3xl">
            Popular Destinations
          </h1>
          <p className="phone:text-sm">
            Vacations to make your experience enjoyable in Indonesia!
          </p>
        </div>

        <div className="flex flex-row items-center gap-2 cursor-pointer">
          <p className="text-[#42A7C3] font-semibold">See all Destination</p>
          <ChevronRight size={15} color="#42A7C3" />
        </div>
      </div>

      <div className="mt-10 flex flex-row justify-between gap-5 tablet:flex-col phone:flex-col">
        {Array(4)
          .fill(4)
          .map((_, index) => (
            <CardDestination key={index} />
          ))}
      </div>
    </div>
  );
};

export default PopularDestination;
