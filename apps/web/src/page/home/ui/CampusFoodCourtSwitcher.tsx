'use client';

import { useState } from 'react';

import { SegmentedControl } from '@/shared/ui';

import CampusFoodCourtCard, { type CampusFoodCourt } from './CampusFoodCourtCard';

export default function CampusFoodCourtSwitcher({
  campusFoodCourts,
}: {
  campusFoodCourts: CampusFoodCourt[];
}) {
  const [selectedHref, setSelectedHref] = useState(campusFoodCourts[0].href);
  const selected =
    campusFoodCourts.find(campusFoodCourt => campusFoodCourt.href === selectedHref) ??
    campusFoodCourts[0];

  return (
    <div className='flex flex-col gap-4 p-4 bg-white rounded-[16px]'>
      <SegmentedControl
        options={campusFoodCourts.map(campusFoodCourt => ({
          value: campusFoodCourt.href,
          label: campusFoodCourt.title,
        }))}
        value={selectedHref}
        onChange={setSelectedHref}
      />
      <CampusFoodCourtCard {...selected} viewMenuText='메뉴보기' />
    </div>
  );
}
