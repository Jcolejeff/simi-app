import React from 'react';

import Container from '@/components/shared/container';
import Newsletter from '@/components/shared/newsletter';
import { Separator } from '@/components/ui/separator';

import useWindowDimensions from '@/hooks/useWindowDimensions';

import BottomNav from './components/bottom-nav';
import ContactDetails from './components/contact-details';
import Copyright from './components/copyright';
import LearnMore from './components/learn-more';
import QuickLinks from './components/quick-links';

function Footer() {
  const { width } = useWindowDimensions();

  return (
    <Container className="py-0" backgroundColor="bg-black">
      <main
        style={{ maxWidth: '1200px', marginBottom: width && width <= 768 ? '100px' : '0px' }}
        className="mx-auto w-full pt-4"
      >
        <div className="mb-4 grid w-full grid-cols-1 gap-8 px-4 pt-4 md:grid-cols-3">
          <ContactDetails />
          <QuickLinks />
          <LearnMore />
        </div>
        {width && width <= 768 && <Newsletter mode={'dark'} />}
        <Separator style={{ color: '#989898' }} />
        <Copyright />
        {width && width <= 768 && <BottomNav />}
      </main>
    </Container>
  );
}

export default Footer;
