import React from 'react';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <div className="mt-15">
      <div className="bg-gradient-to-b from-[#42A7C3] to-white h-full w-full absolute top-0 z-[-1] opacity-15" />

      <div className="flex flex-row justify-between items-center px-20 phone:px-5">
        <div>
          <h1 className="text-6xl font-bold phone:text-2xl">
            Start your journey <br />
            by one click, explore <br /> beautiful world!
          </h1>

          <p className="my-8 w-2/3 phone:text-sm">
            Plan and book your perfect trip with expert advice, travel tips,
            destination information and inspiration from us!
          </p>

          <div className="flex flex-row gap-4">
            <Image
              src="/PNG/google_play.png"
              alt="ilustration1"
              width={123}
              height={40}
            />
            <Image
              src="/PNG/app_store.png"
              alt="ilustration1"
              width={123}
              height={40}
            />
          </div>
        </div>

        <Image
          src="/PNG/illustration1.png"
          alt="ilustration1"
          width={648}
          height={594}
          className="tablet:hidden desktop:absolute desktop:z-[-1] desktop:right-0 desktop:w-[500px] phone:absolute phone:z-[-1] phone:w-[200px] phone:right-0 phone:top-25"
        />
      </div>
    </div>
  );
};

export default HeroSection;
