import { FOOD_COURT_ID } from '@/shared/api';
import {
  FOOD_COURT_RESTAURANTS,
  RESTAURANT_ID_BY_NAME,
} from '@/shared/constants/campus/restaurant';

import Home from '../../../public/icons/icon-home.svg';
import Restaurant2 from '../../../public/icons/icon-restaurant2.svg';
import Review from '../../../public/icons/icon-review.svg';
import User from '../../../public/icons/icon-user.svg';

const defaultCampusHref = `/campus/${FOOD_COURT_ID.KYONGSUL}/${RESTAURANT_ID_BY_NAME[FOOD_COURT_RESTAURANTS.KYONGSUL[0]]}`;

export const NAV_ITEMS = [
  { href: '/', label: '홈', icon: <Home className='size-6' /> },
  {
    href: defaultCampusHref,
    label: '교내식당',
    icon: <Restaurant2 className='size-6' />,
  },
  { href: '/review', label: '리뷰', icon: <Review className='size-6' /> },
  { href: '/user', label: '마이', icon: <User className='size-6' /> },
];

export function isNavItemActive(pathname: string, href: string) {
  return href === '/'
    ? pathname === '/'
    : pathname.startsWith(`/${href.split('/')[1]}`);
}
