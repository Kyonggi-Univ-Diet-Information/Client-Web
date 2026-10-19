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
              {/* Phone Mockup */}
              <div class='relative h-[580px] w-[280px] rounded-[3.5rem] bg-gray-950 p-3.5 shadow-[0_0_50px_-12px_rgba(0,0,0,0.3)] ring-1 ring-white/10 md:h-[640px] md:w-[310px]'>
                <div class='h-full w-full overflow-hidden rounded-[2.8rem] bg-white'>
                  {/* Mockup App Content */}
                  <div class='flex h-full flex-col'>
                    <div class='bg-point/5 flex h-48 flex-col items-center justify-center gap-4'>
                      <img
                        src='/icons/icon512_rounded.png'
                        alt='기밥 앱 로고'
                        class='h-20 w-20 rounded-2xl shadow-xl shadow-orange-200'
                      />
                    </div>
                    <div class='flex flex-1 flex-col gap-6 p-7'>
                      <div class='space-y-3'>
                        <div class='h-4.5 w-2/3 rounded-full bg-gray-100'></div>
                        <div class='h-4.5 w-full rounded-full bg-gray-50'></div>
                      </div>
                      <div class='space-y-4 rounded-3xl border border-gray-100 bg-gray-50/50 p-5'>
                        <div class='flex items-center justify-between'>
                          <div class='h-4 w-20 rounded-full bg-gray-200'></div>
                          <div class='bg-point/20 h-4 w-4 rounded-full'></div>
                        </div>
                        <div class='space-y-2'>
                          <div class='h-3 w-full rounded-full bg-gray-100'></div>
                          <div class='h-3 w-4/5 rounded-full bg-gray-100'></div>
                        </div>
                      </div>
                      <div class='grid grid-cols-2 gap-3'>
                        <div class='h-24 rounded-2xl border border-gray-100 bg-gray-50'></div>
                        <div class='h-24 rounded-2xl border border-gray-100 bg-gray-50'></div>
                      </div>
                    </div>
                    <div class='mt-auto flex h-16 items-center justify-between border-t border-gray-100 bg-white/50 px-8'>
                      {[1, 2, 3, 4].map(() => (
                        <div class='h-2 w-6 rounded-full bg-gray-100'></div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Dynamic Island style element */}
                <div class='absolute left-1/2 top-0 h-7 w-28 -translate-x-1/2 rounded-b-[1.25rem] bg-gray-950'></div>
              </div>

              {/* Float Cards */}
              <div class='absolute -right-4 top-1/4 animate-bounce duration-[3000ms]'>
                <div class='rounded-2xl border border-white/20 bg-white/80 p-4 shadow-xl backdrop-blur-md'>
                  <div class='flex items-center gap-3'>
                    <div class='flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-lg'>
                      🍱
                    </div>
                    <div class='space-y-1'>
                      <p class='text-xs font-bold text-gray-400'>
                        오늘의 인기 메뉴
                      </p>
                      <p class='text-sm font-extrabold'>매콤 제육볶음</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class='absolute -left-10 bottom-1/4 animate-bounce duration-[2500ms]'>
                <div class='rounded-2xl border border-white/20 bg-white/80 p-4 shadow-xl backdrop-blur-md'>
                  <div class='flex items-center gap-3'>
                    <div class='flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-lg'>
                      ⭐
                    </div>
                    <div class='space-y-1'>
                      <p class='text-xs font-bold text-gray-400'>최근 리뷰</p>
                      <p class='text-sm font-extrabold'>맛있어서 기절..</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section class='relative bg-gray-50/50 px-6 py-24 md:px-12 md:py-40'>
        <div class='mx-auto max-w-7xl'>
          <div class='mb-24 text-center'>
            <h2 class='mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl'>
              학교 생활의 즐거움, <br />
              <span class='text-point font-gyeonggiTitleBold'>기밥</span> 하나로 충분하니까
            </h2>
            <p class='mx-auto max-w-2xl text-lg font-medium text-gray-500'>
              우리는 경기대 학우들의 식사 시간을 더 가치 있게 만들기 위해{' '}
              <br class='hidden md:block' />꼭 필요한 기능들을 세심하게
              담았습니다.
            </p>
          </div>

          <div class='grid gap-8 md:grid-cols-2'>
            {[
              {
                title: '다양한 학식 메뉴 확인',
                desc: '기숙사 식당 식단 뿐 아니라, 교내 식당의 메뉴를 모두 확인할 수 있어요.',
                icon: '🍱',
                color: 'bg-orange-50',
                textColor: 'text-orange-600',
              },
              {
                title: '생생한 메뉴 리뷰',
                desc: '학우들의 솔직한 평가와 리뷰를 통해 실패 없는 메뉴 선택이 가능해요.',
                icon: '⭐',
                color: 'bg-blue-50',
                textColor: 'text-blue-600',
              },
            ].map(feature => (
              <div class='group relative cursor-pointer overflow-hidden rounded-[2.5rem] bg-white p-10 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-100'>
                <div
                  class={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl ${feature.color}`}
                >
                  {feature.icon}
                </div>
                <h3 class='mb-4 text-2xl font-bold'>{feature.title}</h3>
                <p class='text-lg leading-relaxed text-gray-500'>
                  {feature.desc}
                </p>
              </div>
            ))}
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
