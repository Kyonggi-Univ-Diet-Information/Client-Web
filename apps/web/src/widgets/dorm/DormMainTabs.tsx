'use client';

import { getCampusMainTabs } from '@/entities/campus/model/campus';

import { StaticTabNavigation } from '@/shared/ui';


export default function DormMainTabs() {
  const mainTabs = getCampusMainTabs('ko', '기숙사', new Date().getDay());

  return (
    <StaticTabNavigation tabs={mainTabs} currentTabKey='dorm' variant='header' />
  );
}
