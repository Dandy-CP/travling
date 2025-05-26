import React from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

const CardDestination = () => {
  return (
    <div className="w-full bg-[#F0F0F0] rounded-2xl p-3 hover:bg-white hover:shadow-2xl cursor-pointer">
      <Image
        src="/PNG/dummyArticle.png"
        alt="destination"
        width={364}
        height={180}
        className="mx-auto rounded-2xl w-full"
      />

      <div className="flex flex-row gap-1 items-center my-3">
        <MapPin size={16} color="#42A8C3" />
        <p className="text-xs text-[#8F8F8F]">Manggarai Barat</p>
      </div>

      <p className="text-xl font-semibold">Flores Road Trip 3D2N</p>
      <p className="text-gray-600 mb-15">3 Days</p>
      <p className="text-lg font-semibold text-[#42A7C3] mt-auto">
        Rp 6.705.000 <span className="text-sm">/ orang</span>
      </p>
    </div>
  );
};

export default CardDestination;
