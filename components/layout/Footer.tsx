import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className="h-[257px] px-20 py-15 bg-muted tablet:px-8 phone:h-full phone:px-5">
      <div className="flex flex-row justify-between phone:flex-col phone:gap-5">
        <Image src="/SVG/logo.svg" alt="logo" width={141} height={50} />

        <div>
          <p className="font-semibold">Address</p>
          <p>Jakarta, Indonesia</p>
        </div>

        <div>
          <p className="font-semibold">Phone Number</p>
          <p>1800 123 4567</p>
        </div>

        <div>
          <p className="font-semibold">Email</p>
          <p>travling@project.io</p>
        </div>
      </div>

      <div className="flex flex-row justify-between mt-25 phone:flex-col phone:gap-3">
        <p>© {new Date().getFullYear()} Travling. All rights reserved.</p>

        <div className="flex flex-row gap-5">
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
          <p>Cookies Settings</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
