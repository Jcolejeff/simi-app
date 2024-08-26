import React from 'react';

import Image from 'next/image';

import { Text } from '@/components/ui/text';

interface category {
  id: number;
  img: any;
  title: string;
}

function CategoryItem({ category }: { category: category }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="overflow-hidden rounded-full bg-white py-4">
        <Image src={category.img} alt={category.title} />
      </div>
      <Text variant={'white'} size={'sm'} weight={'medium'}>
        {category.title}
      </Text>
    </div>
  );
}

export default CategoryItem;
