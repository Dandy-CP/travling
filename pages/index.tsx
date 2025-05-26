import React from 'react';
import {
  HeroSection,
  PopularDestination,
  WhyChooseUs,
  PopularArticle,
} from '@/components/modules/home';

export default function Home() {
  return (
    <div>
      <HeroSection />

      <div className="px-20 desktop:px-10 tablet:px-8 phone:px-5">
        <PopularDestination />
        <WhyChooseUs />
        <PopularArticle />
      </div>
    </div>
  );
}
