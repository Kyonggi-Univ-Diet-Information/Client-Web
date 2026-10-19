import { For, createSignal, onCleanup, onMount } from 'solid-js';

export default function Intro() {
  const POLICY_URL = {
    TERMS_OF_SERVICE:
      'https://abounding-mice-0a1.notion.site/2e7d8a0f1c3f8007a4d4c53c451fb684',
    PRIVACY_POLICY:
      'https://abounding-mice-0a1.notion.site/2e7d8a0f1c3f8042aea7cd51f36ea27d',
  };

  const PLAY_STORE_URL =
    'https://play.google.com/store/apps/details?id=apple.auth.diet.kyonggi.com';

  const APP_STORE_URL =
    'https://apps.apple.com/kr/app/%EA%B8%B0%EB%A3%A1%EC%95%84-%EB%B0%A5%EB%A8%B9%EC%9E%90/id6758451053';

  const INQUIRY_URL = 'https://pf.kakao.com/_LxmSxhX/chat';

  const PATCHNOTE_URL =
    'https://abounding-mice-0a1.notion.site/26ad8a0f1c3f804398f1d2baa67d3457';

  return (
    <div class='min-h-screen bg-white text-gray-900'>
      {/* Navigation */}
      <nav class='fixed top-0 z-50 w-full border-b border-gray-50 bg-white/70 px-6 py-4 backdrop-blur-xl md:px-12'>
        <div class='mx-auto flex max-w-7xl items-center justify-between'>
          <div class='flex items-center gap-2.5'>
            <img
              src='/icons/icon512_rounded.png'
              alt='기밥 로고'
              class='h-9 w-9 rounded-xl shadow-lg shadow-orange-100'
            />
            <span class='font-gyeonggiTitleBold text-xl tracking-tight'>
              기룡아 밥먹자
            </span>
          </div>
          <div class='flex items-center gap-6'>
            <a
              href={INQUIRY_URL}
              target='_blank'
              rel='noopener noreferrer'
              class='hover:text-point text-sm font-semibold text-gray-500 transition-colors'
            >
              문의하기
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section class='relative overflow-hidden px-6 pb-20 pt-32 md:px-12 md:pb-32 md:pt-48'>
        {/* Decorative elements */}
        <div class='absolute right-[10%] top-20 -z-10 h-96 w-96 animate-pulse rounded-full bg-orange-100/50 blur-[100px]'></div>
        <div class='absolute bottom-0 left-[5%] -z-10 h-80 w-80 rounded-full bg-blue-50/50 blur-[80px]'></div>

        <div class='mx-auto max-w-7xl'>
          <div class='flex flex-col items-center gap-16 lg:flex-row'>
            <div class='flex flex-1 flex-col items-center text-center lg:items-start lg:text-left'>
              <div class='text-point mb-8 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50/50 px-4 py-1.5 text-xs font-bold backdrop-blur-sm'>
                <span class='relative flex h-2 w-2'>
                  <span class='bg-point absolute inline-flex h-full w-full animate-ping rounded-full opacity-75'></span>
                  <span class='bg-point relative inline-flex h-2 w-2 rounded-full'></span>
                </span>
                2026 경기대학교 학식의 혁신
              </div>
              <h1 class='mb-8 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl'>
                오늘의 학식, <br />
                더 이상 고민 말고 <br />
                <span class='text-point font-gyeonggiTitleBold'>기밥</span>하세요
              </h1>
              <p class='mb-12 text-lg font-medium leading-relaxed text-gray-500 md:text-xl'>
                다양한 학식 메뉴 확인부터 생생한 학생들의 리뷰까지.{' '}
                <br class='hidden md:block' />
                경기대생을 위한 단 하나의 학식 커뮤니티, 기밥을 지금 바로
                만나보세요.
              </p>

              <div class='flex w-full flex-col gap-4 sm:w-auto sm:flex-row'>
                <a
                  href={APP_STORE_URL}
                  target='_blank'
                  rel='noopener noreferrer'
                  class='bg-point py-4.5 flex flex-1 cursor-pointer items-center justify-center gap-3 rounded-2xl px-8 font-bold text-white shadow-lg shadow-orange-100 transition-all hover:scale-105 hover:shadow-xl hover:shadow-orange-200 active:scale-95 sm:flex-none'
                >
                  <img
                    src='/icons/app-store.png'
                    alt='App Store'
                    class='size-5'
                  />
                  <div class='flex flex-col items-start leading-none'>
                    <span class='text-[10px] opacity-80'>Download on the</span>
                    <span class='text-lg'>App Store</span>
                  </div>
                </a>
                <a
                  href={PLAY_STORE_URL}
                  target='_blank'
                  rel='noopener noreferrer'
                  class='py-4.5 flex flex-1 cursor-pointer items-center justify-center gap-3 rounded-2xl bg-gray-900 px-8 font-bold text-white shadow-lg shadow-gray-200 transition-all hover:scale-105 hover:shadow-xl hover:shadow-gray-300 active:scale-95 sm:flex-none'
                >
                  <img
                    src='/icons/google-play.png'
                    alt='Google Play'
                    class='size-5'
                  />
                  <div class='flex flex-col items-start leading-none'>
                    <span class='text-[10px] opacity-80'>Get it on</span>
                    <span class='text-lg'>Google Play</span>
                  </div>
                </a>
              </div>

              {/* <div class='mt-12 flex items-center gap-4'>
                <div class='flex -space-x-2'>
                  {[1, 2, 3, 4].map(() => (
                    <div class='h-9 w-9 rounded-full border-2 border-white bg-gray-200'></div>
                  ))}
                  <div class='flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-[10px] font-bold text-gray-400'>
                    +1.2k
                  </div>
                </div>
                <p class='text-sm font-semibold text-gray-500'>
                  1,200명 이상의 학우들이 사용 중
                </p>
              </div> */}
            </div>

            <div class='relative flex flex-1 items-center justify-center lg:justify-end'>
              <ScreenshotCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section class='relative bg-gray-50/50 px-6 py-24 md:px-12 md:py-40'>
        <div class='mx-auto max-w-7xl'>
          <div class='text-center'>
            <h2 class='mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl'>
              학교 생활의 즐거움, <br />
              <span class='text-point font-gyeonggiTitleBold'>기밥</span> 하나로 충분하니까
            </h2>
            <p class='mx-auto max-w-2xl text-lg font-medium text-balance break-keep text-gray-500'>
              우리는 경기대 학우들의 식사 시간을 더 가치 있게 만들기 위해 꼭
              필요한 기능들을 세심하게 담았습니다.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section class='relative overflow-hidden px-6 py-32 text-center md:py-48'>
          <div class='absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-50 blur-[120px]'></div>
          
          <div class='mx-auto max-w-4xl'>
            <h2 class='mb-12 text-4xl font-extrabold leading-tight md:text-6xl'>
              더 나은 학교 생활, <br />
              지금 <span class='text-point font-gyeonggiTitleBold'>기밥</span>과 함께하세요
            </h2>
            <div class='flex flex-col sm:flex-row justify-center gap-6'>
              <button class='bg-point rounded-2xl px-12 py-5.5 text-xl font-bold text-white shadow-2xl shadow-orange-200 transition-all hover:scale-105 active:scale-95'>
                무료로 시작하기
              </button>
              <a 
                href={INQUIRY_URL}
                target='_blank'
                rel='noopener noreferrer'
                class='flex items-center justify-center rounded-2xl bg-white px-12 py-5.5 text-xl font-bold text-gray-900 border border-gray-200 transition-all hover:bg-gray-50 hover:scale-105 active:scale-95'
              >
                팀에게 문의하기
              </a>
            </div>
          </div>
        </section> */}

      {/* Footer */}
      <footer class='border-t border-gray-100 bg-white px-6 py-20 md:px-12'>
        <div class='mx-auto max-w-7xl'>
          <div class='mb-16 flex flex-col items-center justify-between gap-10 md:flex-row md:items-start'>
            <div class='flex flex-col items-center gap-6 md:items-start'>
              <div class='flex items-center gap-2.5'>
                <img
                  src='/icons/icon512_rounded.png'
                  alt='기밥 로고'
                  class='h-7 w-7 rounded-lg opacity-90'
                />
                <span class='font-gyeonggiTitleBold text-xl tracking-tight'>
                  기룡아 밥먹자
                </span>
              </div>
              <p class='text-center text-sm font-medium leading-relaxed text-gray-400 md:text-left'>
                경기대학교 학생들을 위한 <br />
                최고의 학식 커뮤니티 플랫폼
              </p>
            </div>

            <div class='grid grid-cols-2 gap-12 sm:grid-cols-3 md:gap-20'>
              <div class='space-y-4'>
                <h4 class='text-sm font-bold uppercase tracking-wider text-gray-900'>
                  서비스
                </h4>
                <ul class='space-y-3 text-sm font-semibold text-gray-500'>
                  <li class='hover:text-point cursor-pointer transition-colors'>
                    <a
                      href={PATCHNOTE_URL}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      공지사항
                    </a>
                  </li>
                  <li class='hover:text-point cursor-pointer transition-colors'>
                    <a
                      href={INQUIRY_URL}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      기능 제안
                    </a>
                  </li>
                </ul>
              </div>
              <div class='space-y-4'>
                <h4 class='text-sm font-bold uppercase tracking-wider text-gray-900'>
                  고객지원
                </h4>
                <ul class='space-y-3 text-sm font-semibold text-gray-500'>
                  <li>
                    <a
                      href={INQUIRY_URL}
                      target='_blank'
                      rel='noopener noreferrer'
                      class='hover:text-point transition-colors'
                    >
                      카카오톡 문의
                    </a>
                  </li>
                  <li class='hover:text-point cursor-pointer transition-colors'>
                    FAQ
                  </li>
                </ul>
              </div>
              <div class='col-span-2 space-y-4 sm:col-span-1'>
                <h4 class='text-sm font-bold uppercase tracking-wider text-gray-900'>
                  법적 고지
                </h4>
                <ul class='space-y-3 text-sm font-semibold text-gray-500'>
                  <li class='hover:text-point cursor-pointer transition-colors'>
                    <a
                      href={POLICY_URL.TERMS_OF_SERVICE}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      이용약관
                    </a>
                  </li>
                  <li class='hover:text-point cursor-pointer transition-colors'>
                    <a
                      href={POLICY_URL.PRIVACY_POLICY}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      개인정보처리방침
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class='flex flex-col items-center justify-between gap-6 border-t border-gray-50 pt-10 md:flex-row'>
            <p class='text-xs font-bold text-gray-400'>
              © 2026 Let's eat Kiryong! All rights reserved.
            </p>
            <div class='flex gap-6'>
              <div class='h-5 w-5 rounded-md bg-gray-100'></div>
              <div class='h-5 w-5 rounded-md bg-gray-100'></div>
              <div class='h-5 w-5 rounded-md bg-gray-100'></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const SCREENSHOTS = [1, 2, 3, 4, 5].map(n => `/screenshots/ios-${n}.jpg`);

function ScreenshotCarousel() {
  let track!: HTMLDivElement;
  const [index, setIndex] = createSignal(0);

  const goTo = (i: number) =>
    track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });

  onMount(() => {
    const timer = setInterval(
      () => goTo((index() + 1) % SCREENSHOTS.length),
      3500,
    );
    onCleanup(() => clearInterval(timer));
  });

  return (
    <div class='flex flex-col items-center gap-5'>
      <div
        ref={track}
        onScroll={() =>
          setIndex(Math.round(track.scrollLeft / track.clientWidth))
        }
        class='scrollbar-hide flex aspect-[1320/2868] w-[280px] snap-x snap-mandatory overflow-x-auto rounded-[2rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.3)] md:w-[310px]'
      >
        <For each={SCREENSHOTS}>
          {(src, i) => (
            <img
              src={src}
              alt={`기밥 앱 화면 ${i() + 1}`}
              loading={i() === 0 ? 'eager' : 'lazy'}
              class='h-full w-full shrink-0 snap-center object-cover'
            />
          )}
        </For>
      </div>
      <div class='flex gap-2'>
        <For each={SCREENSHOTS}>
          {(_, i) => (
            <button
              type='button'
              aria-label={`${i() + 1}번째 화면 보기`}
              onClick={() => goTo(i())}
              class={`h-2 rounded-full transition-all ${
                index() === i() ? 'bg-point w-6' : 'w-2 bg-gray-300'
              }`}
            />
          )}
        </For>
      </div>
    </div>
  );
}
