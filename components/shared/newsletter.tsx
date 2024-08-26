/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import { Text } from '../ui/text';

import { NewsletterForm } from './newsletter-form';

function Newsletter({ mode }: { mode?: 'light' | 'dark' }) {
  return (
    <main
      style={{ maxWidth: '1200px' }}
      className={`mx-auto flex w-full flex-col items-center justify-center gap-1 ${mode === 'dark' ? 'bg-black' : 'bg-white'} py-8`}
    >
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col items-start justify-start gap-2 px-4 md:items-start">
          <Text className={mode === 'dark' ? 'text-white' : ''} size={'xl'} weight={'semibold'}>
            Subscribe to our Newsletter
          </Text>
          <Text
            className={`text-left ${mode === 'dark' ? 'text-[#989898]' : 'text-gray-500'}`}
            size={'sm'}
            weight={'normal'}
          >
            Join our community of food enthusiasts. Sign up today and let's embark on this flavorful adventure together!
          </Text>
        </div>
        <NewsletterForm mode={mode} />
      </div>
    </main>
  );
}

export default Newsletter;
