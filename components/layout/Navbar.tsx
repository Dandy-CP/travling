import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import MobileMenu from './partials/MobileMenu';
import { useAuth } from '@/hooks';

interface NavbarProps {
  isDashboardPage: boolean;
  pathname: string;
}

const Navbar = ({ isDashboardPage, pathname }: NavbarProps) => {
  const { authData, signOut } = useAuth();

  const isHasLogedIn = authData === null;
  const initialName = authData?.username.split('')[0].toUpperCase();

  const menu = [
    {
      label: 'Product',
      link: '#',
    },
    {
      label: 'Contact Us',
      link: '#',
    },
    {
      label: 'About Us',
      link: '#',
    },
    {
      label: 'Article',
      link: '/article',
    },
  ];

  return (
    <div
      className={`flex flex-row items-center justify-between ${
        isDashboardPage
          ? 'p-3 border border-b border-[#D3D3D3]'
          : 'py-5 px-20 desktop:p-10 tablet:px-8 phone:p-5'
      }`}
    >
      <Link href="/">
        <Image src="/SVG/logo.svg" alt="logo" width={141} height={50} />
      </Link>

      <MobileMenu
        menu={menu}
        pathname={pathname}
        isDashboardPage={isDashboardPage}
        isHasLogedIn={isHasLogedIn}
        initialName={initialName ?? ''}
        username={authData?.username ?? ''}
      />

      {!isDashboardPage && (
        <div className="flex flex-row gap-4 phone:hidden tablet:hidden desktop:hidden">
          {menu.map((value) => (
            <Link
              key={value.label}
              href={value.link}
              className={`underline-offset-4 hover:underline ${
                pathname === value.link ? 'underline' : ''
              }`}
            >
              {value.label}
            </Link>
          ))}
        </div>
      )}

      {isHasLogedIn && (
        <div className="flex flex-row gap-3 phone:hidden tablet:hidden desktop:hidden">
          <Link href="/signup">
            <Button className="w-20">Sign Up</Button>
          </Link>

          <Link href="/auth">
            <Button variant="outline" className="w-20">
              Login
            </Button>
          </Link>
        </div>
      )}

      {!isHasLogedIn && (
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="phone:hidden desktop:hidden tablet:hidden"
          >
            <div className="flex flex-row items-center gap-2 hover:shadow-2xl cursor-pointer p-3 rounded-2xl">
              <Avatar>
                <AvatarFallback>{initialName}</AvatarFallback>
              </Avatar>

              <p className="capitalize font-semibold">{authData.username}</p>

              <ChevronDown size={14} />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-50 p-3 phone:hidden">
            {!isDashboardPage && (
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  window.location.assign('/dashboard');
                }}
              >
                <LayoutDashboard />
                <span className="font-semibold">Dashboard</span>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                signOut();
              }}
            >
              <LogOut color="red" />
              <span className="text-red-500 font-semibold">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default Navbar;
