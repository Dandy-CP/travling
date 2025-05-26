import React from 'react';
import Image from 'next/image';

const WhyChooseUs = () => {
  const experiences = [
    {
      title: 'Flight Ticket',
      body: 'Vitae donec pellentesque a aliquam et ultricies auctor.',
      iconPath: '/SVG/plane.svg',
    },
    {
      title: 'Accomodation',
      body: 'Vitae donec pellentesque a aliquam et ultricies auctor. ',
      iconPath: '/SVG/hotel.svg',
    },
    {
      title: 'Packaged Tour',
      body: 'Vitae donec pellentesque a aliquam et ultricies auctor. ',
      iconPath: '/SVG/bag.svg',
    },
  ];

  return (
    <div className="mt-20 flex flex-row justify-center items-center desktop:justify-start tablet:justify-start">
      <Image
        src="/PNG/illustration2.png"
        alt="ilustration1"
        width={620}
        height={492}
        className="desktop:w-[450px] tablet:hidden phone:hidden"
      />

      <div>
        <h1 className="text-4xl font-semibold mb-3">Why Choose Us</h1>
        <p>
          Enjoy different experiences in every place you visit and <br />
          discover new and affordable adventures of course.
        </p>

        <div className="mt-10">
          {experiences.map((value) => (
            <div
              key={value.title}
              className="hover:bg-white hover:rounded-2xl hover:shadow-2xl flex flex-row gap-5 p-8 cursor-pointer"
            >
              <Image src={value.iconPath} alt="plane" width={33} height={33} />

              <div>
                <p className="text-xl font-semibold">{value.title}</p>
                <p>{value.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
