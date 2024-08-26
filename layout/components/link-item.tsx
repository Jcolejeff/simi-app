import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Each from '@/components/helpers/each';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import { cn } from '@/lib/utils/css';

import { Route } from '@/types';

const LinkItem = ({ route }: { route: Route }) => {
  const pathname = usePathname();

  if (route.components) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger className={`${pathname.includes(route.href) && 'text-primary'}`}>
          {route.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="flex min-w-[400px] gap-3 bg-white p-4 md:min-w-[500px] lg:min-w-[600px]">
            <Each
              of={route.components}
              render={(component: any, index: any) => (
                <ListItem key={component.title} title={component.title} href={component.href}>
                  {component.description}
                </ListItem>
              )}
            />
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <Link href={route.href} legacyBehavior passHref>
        <NavigationMenuLink
          className={`${navigationMenuTriggerStyle()} hover:underline ${pathname === route.href && 'text-primary'}`}
        >
          {route.title}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li className="rounded-md duration-200 hover:bg-gray-100" style={{ width: '200px' }}>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
              className,
            )}
            {...props}
          >
            <div className="mb-2 text-sm font-semibold leading-none">{title}</div>
            <p className="line-clamp-2 text-xs leading-snug text-gray-400">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = 'ListItem';

export default LinkItem;
