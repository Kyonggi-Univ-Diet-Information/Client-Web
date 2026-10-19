const INQUIRY_URL = 'https://pf.kakao.com/_LxmSxhX/chat';
const DEVELOPER_EMAIL = 'kiryongteam@gmail.com';

export default function DeleteAccount() {
  return (
    <main class='mx-auto min-h-screen max-w-2xl bg-white px-6 py-16 text-grey-700'>
      <h1 class='mb-2 text-2xl font-bold text-grey-900'>
        기룡아 밥먹자 계정 삭제 안내
      </h1>
      <dl class='mb-10 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 rounded-xl bg-grey-50 p-4 text-sm'>
        <dt class='text-grey-500'>앱 이름</dt>
        <dd class='font-medium text-grey-900'>기룡아 밥먹자</dd>
        <dt class='text-grey-500'>개발자</dt>
        <dd class='font-medium text-grey-900'>기룡아 밥먹자 팀</dd>
        <dt class='text-grey-500'>문의</dt>
        <dd>
          <a href={`mailto:${DEVELOPER_EMAIL}`} class='underline'>
            {DEVELOPER_EMAIL}
          </a>
        </dd>
      </dl>

      <section class='mb-10'>
        <h2 class='mb-3 text-lg font-bold text-grey-900'>
          앱에서 직접 삭제하기
        </h2>
        <ol class='list-decimal space-y-1 pl-5'>
          <li>기룡아 밥먹자 앱에 로그인해요.</li>
          <li>하단 탭에서 마이페이지로 이동해요.</li>
          <li>회원탈퇴를 누르고 탈퇴 사유를 선택해요.</li>
          <li>확인을 누르면 계정이 즉시 삭제돼요.</li>
        </ol>
      </section>

      <section class='mb-10'>
        <h2 class='mb-3 text-lg font-bold text-grey-900'>
          앱 없이 삭제 요청하기
        </h2>
        <p>
          앱을 사용할 수 없다면{' '}
          <a
            href={INQUIRY_URL}
            target='_blank'
            rel='noopener noreferrer'
            class='text-primary-500 underline'
          >
            카카오톡 채널 문의하기
          </a>{' '}
          또는{' '}
          <a
            href={`mailto:${DEVELOPER_EMAIL}`}
            class='text-primary-500 underline'
          >
            {DEVELOPER_EMAIL}
          </a>
          로 가입한 소셜 계정(카카오·구글·애플)과 함께 삭제를 요청해 주세요.
          확인 후 7일 이내에 처리해 드려요.
        </p>
      </section>

      <section class='mb-10'>
        <h2 class='mb-3 text-lg font-bold text-grey-900'>
          탈퇴 즉시 삭제되는 데이터
        </h2>
        <ul class='list-disc space-y-1 pl-5'>
          <li>소셜 로그인 식별 정보, 닉네임 등 회원 정보</li>
          <li>작성한 모든 리뷰</li>
          <li>좋아요한 리뷰 목록</li>
        </ul>
        <p class='mt-3 text-sm text-grey-500'>
          삭제된 데이터는 복구할 수 없어요.
        </p>
      </section>

      <section>
        <h2 class='mb-3 text-lg font-bold text-grey-900'>
          보관되는 데이터와 보관 기간
        </h2>
        <ul class='list-disc space-y-1 pl-5'>
          <li>
            서비스 이용 기록: 서비스 운영과 분쟁 대응 목적이 끝날 때까지 보관한
            뒤 지체 없이 파기해요.
          </li>
          <li>
            관련 법령에서 보관을 요구하는 정보: 해당 법령이 정한 기간 동안만
            보관한 뒤 파기해요.
          </li>
        </ul>
        <p class='mt-3 text-sm text-grey-500'>
          그 밖의 개인정보는 탈퇴 즉시 파기하며 따로 보관하지 않아요.
        </p>
      </section>
    </main>
  );
}
