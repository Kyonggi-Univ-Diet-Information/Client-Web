
import { CampusFoodCourtPage, CampusFoodCourtPageProps } from '@/page/campus';

import { FOOD_COURT_ID } from '@/shared/api';
import { CAMPUS_FOOD_COURTS } from '@/shared/constants/campus/restaurant';



export const dynamicParams = true;

export function generateStaticParams() {
  const foodCourtIds = CAMPUS_FOOD_COURTS.map(fc => FOOD_COURT_ID[fc]);

  return foodCourtIds.map(foodCourtId => ({
    foodCourtId,
  }));
}

const Page = async (props: CampusFoodCourtPageProps) => {
  return <CampusFoodCourtPage {...props} />;
};

export default Page;
