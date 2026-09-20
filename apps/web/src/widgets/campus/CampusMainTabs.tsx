'use client';

import { useRouter } from 'next/navigation';

import { getCampusMainTabs } from '@/entities/campus/model/campus';

import { Tab } from '@/shared/ui';

export default function CampusMainTabs({ currentTabKey }: { currentTabKey: string }) {
  const router = useRouter();
  const mainTabs = getCampusMainTabs('ko', '기숙사', new Date().getDay());

  return (
    <div className='px-4'>
      <Tab
        size='md'
        options={mainTabs.map(tab => ({ value: tab.key, label: tab.label }))}
        value={currentTabKey}
        onChange={value => {
          const tab = mainTabs.find(mainTab => mainTab.key === value);
          if (tab) router.push(tab.href);
        }}
      />
    </div>
  );
}
