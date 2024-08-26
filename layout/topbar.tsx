'use client';

// @ts-ignore
import { BellDotIcon, LucidePlus, Search, HeartIcon, ShoppingBag } from 'lucide-react';
import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Separator } from '@/components/ui/separator';

import { useUserContext } from '@/contexts/user-context';
import { Routes } from '@/routes';

import ProfileIconDropdown from '../components/dashboard/profile-icon-dropdown';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Text } from '../components/ui/text';
import logo from '../images/logo.png';

const Topbar = () => {
  const { user } = useUserContext();
  const pathname = usePathname();

  return (
    <section className="flex w-full items-center justify-between border border-secondary px-8 py-2">
      <div className="flex min-w-[24rem] items-center justify-between gap-8">
        <Image src={logo} alt="mfa-logo" />
        <div className="flex h-full w-full items-center rounded-md px-4" style={{ gap: '40px' }}>
          {Routes.map((route, index) => (
            <Link
              className={`mx-6 text-sm hover:underline ${pathname === route.href ? 'text-text-dim' : 'text-black'}`}
              key={index}
              href={route.href}
            >
              {route.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant={'ghost'} size={'none'}>
          <HeartIcon className="w-6" />
        </Button>
        <Separator orientation="vertical" />
        <div className="flex items-center justify-start gap-4">
          <Button variant={'ghost'} size={'none'}>
            <ShoppingBag className="w-6" />
            <span className="absolute bottom-3 top-1 h-4 w-4 border border-red-500"></span>
          </Button>
          <span className="flex flex-col">
            <Text weight={'normal'} size={'xs'}>
              Shopping cart
            </Text>
            <Text weight={'bold'} size={'xs'}>
              NGN 57.00
            </Text>
          </span>
        </div>
        <ProfileIconDropdown />
      </div>
    </section>
  );
};

export default Topbar;
