import { FOOD_COURT } from '@/shared/api';

import {
  authKeys,
  createMutateMatcher,
  matchDomain,
  memberKeys,
  menuKeys,
  queryKeyToString,
  reviewKeys,
  toTag,
} from './queryKey';



describe('Query Key Factory', () => {
  describe('reviewKeys', () => {
    it('paged 키를 생성한다', () => {
      const key = reviewKeys.paged(FOOD_COURT.KYONGSUL, 123, 0);
      expect(key).toEqual(['reviews', FOOD_COURT.KYONGSUL, 123, 0]);
    });

    it('byFood 키를 생성한다', () => {
      const key = reviewKeys.byFood(FOOD_COURT.KYONGSUL, 123);
      expect(key).toEqual(['reviews', FOOD_COURT.KYONGSUL, 123]);
    });

    it('all 키를 생성한다', () => {
      const key = reviewKeys.all();
      expect(key).toEqual(['reviews']);
    });

    it('count, averageRating, ratingCount, faved, favedCount, recent 키를 생성한다', () => {
      expect(reviewKeys.count(FOOD_COURT.KYONGSUL, 1)).toEqual([
        'reviews',
        'count',
        FOOD_COURT.KYONGSUL,
        1,
      ]);
      expect(reviewKeys.averageRating(FOOD_COURT.KYONGSUL, 1)).toEqual([
        'reviews',
        'average-rating',
        FOOD_COURT.KYONGSUL,
        1,
      ]);
      expect(reviewKeys.ratingCount(FOOD_COURT.KYONGSUL, 1)).toEqual([
        'reviews',
        'rating-count',
        FOOD_COURT.KYONGSUL,
        1,
      ]);
      expect(reviewKeys.faved(FOOD_COURT.KYONGSUL)).toEqual([
        'reviews',
        'faved',
        FOOD_COURT.KYONGSUL,
      ]);
      expect(reviewKeys.favedCount(FOOD_COURT.KYONGSUL, 99)).toEqual([
        'reviews',
        'faved-count',
        FOOD_COURT.KYONGSUL,
        99,
      ]);
      expect(reviewKeys.recent()).toEqual(['reviews', 'recent']);
    });
  });

  describe('authKeys', () => {
    it('status 키를 생성한다', () => {
      expect(authKeys.status()).toEqual(['auth-status']);
    });
  });

  describe('memberKeys', () => {
    it('info, reviews, favReviews 키를 생성한다', () => {
      expect(memberKeys.info()).toEqual(['member', 'info']);
      expect(memberKeys.reviews(1)).toEqual(['member', 'reviews', 1]);
      expect(memberKeys.favReviews(2)).toEqual(['member', 'fav-reviews', 2]);
    });
  });

  describe('menuKeys', () => {
    it('dorm, dormByDay, campus, top 키를 생성한다', () => {
      expect(menuKeys.dorm()).toEqual(['menu', 'dorm']);
      expect(menuKeys.dormByDay('월요일')).toEqual(['menu', 'dorm', '월요일']);
      expect(menuKeys.campus(FOOD_COURT.KYONGSUL)).toEqual([
        'menu',
        'campus',
        FOOD_COURT.KYONGSUL,
      ]);
      expect(menuKeys.top()).toEqual(['menu', 'top']);
    });
  });

  describe('.tag()', () => {
    it('Next.js tag 문자열을 반환한다', () => {
      expect(reviewKeys.paged.tag(FOOD_COURT.KYONGSUL, 123, 0)).toBe(
        'reviews:KYONGSUL:123:0',
      );
      expect(authKeys.status.tag()).toBe('auth-status');
      expect(menuKeys.dorm.tag()).toBe('menu:dorm');
    });
  });

  describe('toTag', () => {
    it('배열 키를 tag 문자열로 변환한다', () => {
      expect(toTag(['reviews', FOOD_COURT.KYONGSUL, 123])).toBe(
        'reviews:KYONGSUL:123',
      );
    });
  });

  describe('createMutateMatcher', () => {
    it('prefix 매칭으로 matcher를 생성한다', () => {
      const byFoodKey = reviewKeys.byFood(FOOD_COURT.KYONGSUL, 123);
      const pagedKey = reviewKeys.paged(FOOD_COURT.KYONGSUL, 123, 0);
      const matcher = createMutateMatcher(byFoodKey, pagedKey);

      expect(matcher(['reviews', FOOD_COURT.KYONGSUL, 123, 0])).toBe(true);
      expect(matcher(['reviews', FOOD_COURT.KYONGSUL, 123])).toBe(true);
      expect(matcher(['reviews', FOOD_COURT.KYONGSUL, 123, 1])).toBe(true);
    });

    it('매칭되지 않는 키에 대해 false를 반환한다', () => {
      const matcher = createMutateMatcher(
        reviewKeys.byFood(FOOD_COURT.KYONGSUL, 123),
      );
      expect(matcher(['auth-status'])).toBe(false);
      expect(matcher(['reviews', FOOD_COURT.E_SQUARE, 456])).toBe(false);
    });

    it('배열이 아닌 key에 대해 false를 반환한다', () => {
      const matcher = createMutateMatcher(reviewKeys.all());
      expect(matcher('reviews')).toBe(false);
    });
  });

  describe('matchDomain', () => {
    it('도메인이 일치하면 true를 반환한다', () => {
      expect(
        matchDomain(['reviews', FOOD_COURT.KYONGSUL, 123], 'reviews'),
      ).toBe(true);
    });

    it('도메인이 일치하지 않으면 false를 반환한다', () => {
      expect(matchDomain(['auth-status'], 'reviews')).toBe(false);
    });
  });

  describe('queryKeyToString', () => {
    it('쿼리 키를 문자열로 변환한다', () => {
      const key = ['reviews', FOOD_COURT.KYONGSUL, 123];
      expect(queryKeyToString(key)).toBe(
        JSON.stringify(['reviews', FOOD_COURT.KYONGSUL, 123]),
      );
    });

    it('쿼리 키가 아니면 문자열로 변환한다', () => {
      expect(queryKeyToString('not-an-array')).toBe('not-an-array');
    });
  });
});
