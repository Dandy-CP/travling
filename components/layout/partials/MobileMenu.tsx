import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/hooks';

interface Props {
  isDashboardPage: boolean;
  isHasLogedIn: boolean;
  pathname: string;
  initialName: string;
  username: string;
  menu: {
    label: string;
    link: string;
  }[];
}

const MobileMenu = ({
  menu,
  pathname,
  initialName,
  username,
  isDashboardPage,
  isHasLogedIn,
}: Props) => {
  const { signOut } = useAuth();

  return (
    <Sheet>
      <SheetTrigger asChild className="large:hidden xtraLarge:hidden">
        <Menu />
      </SheetTrigger>

      <SheetContent>
        <div className="p-8">
          <Image src="/SVG/logo.svg" alt="logo" width={141} height={50} />

          <div className="flex flex-col gap-4 mt-10">
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

            {!isHasLogedIn && (
              <>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/dashboard/article">Create Article</Link>
              </>
            )}
          </div>

          {isHasLogedIn && (
            <div className="flex flex-row justify-evenly mt-10">
              <Link href="/signup">
                <Button className="w-full">Sign Up</Button>
              </Link>

              <Link href="/auth">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
            </div>
          )}

          {!isHasLogedIn && (
            <div className="flex flex-row items-center gap-5 absolute bottom-10 right-10">
              <Button
                variant="ghost"
                onClick={() => {
                  signOut();
                }}
              >
                <LogOut color="red" />
                <span className="text-red-500 font-semibold">Logout</span>
              </Button>

              <div className="flex flex-row gap-3 items-center">
                <Avatar>
                  <AvatarFallback>{initialName}</AvatarFallback>
                </Avatar>

                <p className="capitalize font-semibold">{username}</p>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
