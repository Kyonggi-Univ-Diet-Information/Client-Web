import { POLICY_URL } from '@/shared/api';
import { ExternalLink } from '@/shared/ui';



export default function EntryPolicySection() {
  return (
    <p className='mt-10 text-center text-[11px] leading-relaxed text-gray-400'>
      시작 시{' '}
      <ExternalLink
        href={POLICY_URL.TERMS_OF_SERVICE}
        className='underline underline-offset-4'
      >
        이용약관
      </ExternalLink>{' '}
      및{' '}
      <ExternalLink
        href={POLICY_URL.PRIVACY_POLICY}
        className='underline underline-offset-4'
      >
        개인정보처리방침
      </ExternalLink>
      에 동의하게 됩니다.
    </p>
  );
}
