'use client';

import * as React from 'react';

import Each from '@/components/helpers/each';
import { NavigationMenu, NavigationMenuList } from '@/components/ui/navigation-menu';

import { Routes } from '@/routes';

import LinkItem from './link-item';

export function TopNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <Each of={Routes} render={(route: any, index: any) => <LinkItem key={index} route={route} />} />
      </NavigationMenuList>
    </NavigationMenu>
  );
}
