import React from 'react';

import { TabsContent } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';

function InformationTab() {
  return (
    <TabsContent value="information">
      <div className="mx-auto flex w-full max-w-[500px] flex-col items-start justify-start gap-4">
        <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
          <Text size={'sm'} weight={'medium'}>
            Weight: <span className="text-gray-400">03</span>
          </Text>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
          <Text size={'sm'} weight={'medium'}>
            Color: <span className="text-gray-400">Green</span>
          </Text>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
          <Text size={'sm'} weight={'medium'}>
            Type: <span className="text-gray-400">Organic</span>
          </Text>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
          <Text size={'sm'} weight={'medium'}>
            Category: <span className="text-gray-400">Fruits</span>
          </Text>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
          <Text size={'sm'} weight={'medium'}>
            Stock Status: <span className="text-gray-400">Available (5,413)</span>
          </Text>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-start gap-2">
          <Text size={'sm'} weight={'medium'}>
            Tag: <span className="text-gray-400">Vegetables Citrus Cabbage Green Cabbage</span>
          </Text>
        </div>
      </div>
    </TabsContent>
  );
}

export default InformationTab;
