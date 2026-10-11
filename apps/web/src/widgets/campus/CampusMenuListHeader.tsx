// TODO: 서버가 sort 쿼리를 지원하면 정렬 링크 복구 (28e1c6e 참고)
export default function CampusMenuListHeader({
  totalCount,
}: {
  totalCount: number;
}) {
  return (
    <div className='flex items-center justify-between px-4'>
      <p className='text-[13px] text-gray-500'>
        총 <span className='font-semibold text-gray-900'>{totalCount}개</span>
      </p>
    </div>
  );
}
