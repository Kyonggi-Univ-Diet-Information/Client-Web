import { RotateCw, SortDescIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { memo } from 'react';


import { SORTING_TYPE, SORTING_TYPE_NAME, SortingType } from '@/entities/search/model/search';

import {
  FOOD_COURT,
  FOOD_COURT_NAME,
  type FoodCourt,
} from '@/shared/api/api-endpoints';
import { Select } from '@/shared/ui';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/SelectComponent';





interface SearchFilterProps {
  restaurantType: FoodCourt;
  sort: SortingType;
}

export default memo(function SearchFilter({
  restaurantType,
  sort,
}: SearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get('q') || '';

  const onReset = () => {
    router.push(`/search/result?q=${q}`);
  };

  const onSelect = (restaurantType?: FoodCourt, sort?: SortingType) => {
    const params = new URLSearchParams();
    params.set('q', q);
    if (restaurantType) params.set('restaurantType', restaurantType);
    if (sort) params.set('sort', sort);
    router.push(`/search/result?${params.toString()}`);
  };

  function FilterRestaurantType() {
    return (
      <Select
        value={restaurantType}
        onValueChange={value => onSelect(value as FoodCourt, sort)}
      >
        <SelectTrigger className='w-fit rounded-xl'>
          <SelectValue placeholder={restaurantType} />
        </SelectTrigger>
        <SelectContent align='start'>
          <SelectGroup>
            <SelectItem key={'ALL'} value={'ALL'}>
              전체
            </SelectItem>
            {Object.values(FOOD_COURT)
              .filter(type => type !== FOOD_COURT.DORMITORY)
              .map(type => (
                <SelectItem key={type} value={type}>
                  {FOOD_COURT_NAME[type]}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  function FilterSortingType() {
    return (
      <Select
        value={sort}
        onValueChange={value => onSelect(restaurantType, value as SortingType)}
      >
        <SelectTrigger
          className='flex h-full w-fit cursor-pointer items-center justify-center rounded-xl border-none px-0 hover:bg-gray-100 focus:outline-none active:bg-gray-200'
          icon={false}
        >
          <SortDescIcon size={16} />
          <span>{SORTING_TYPE_NAME[sort]}</span>
        </SelectTrigger>
        <SelectContent align='start'>
          <SelectGroup>
            {Object.values(SORTING_TYPE).map(type => (
              <SelectItem key={type} value={type}>
                {SORTING_TYPE_NAME[type]}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  return (
    <div className='flex items-center gap-2'>
      <div className='flex flex-1 items-center justify-start'>
        <FilterSortingType />
      </div>
      <FilterRestaurantType />
      <button
        className='h-full cursor-pointer focus:outline-none'
        onClick={() => onReset()}
      >
        <RotateCw size={16} />
      </button>
    </div>
  );
});
