'use client';

import { SegmentedControl } from '@kiryong/design-system';
import { useState } from 'react';

import CampusFoodCourtCard, {
  type CampusFoodCourt,
} from './CampusFoodCourtCard';

export default function CampusFoodCourtSwitcher({
  campusFoodCourts,
}: {
  campusFoodCourts: CampusFoodCourt[];
}) {
  const [selectedHref, setSelectedHref] = useState(campusFoodCourts[0].href);
  const selected =
    campusFoodCourts.find(
      campusFoodCourt => campusFoodCourt.href === selectedHref,
    ) ?? campusFoodCourts[0];

  return (
    <div className='flex flex-col gap-4 rounded-[16px] bg-white p-4'>
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
