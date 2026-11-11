import CampusFoodCourtCard, {
  type CampusFoodCourt,
} from './CampusFoodCourtCard';

export default function CampusFoodCourtGrid({
  campusFoodCourts,
}: {
  campusFoodCourts: CampusFoodCourt[];
}) {
  return (
    <div className='grid grid-cols-3 gap-4'>
      {campusFoodCourts.map(campusFoodCourt => (
        <div
          key={campusFoodCourt.href}
          className='flex flex-col gap-3 rounded-[16px] bg-white p-4'
        >
          <span className='px-1 text-base font-semibold text-grey-900'>
            {campusFoodCourt.title}
          </span>
          <CampusFoodCourtCard {...campusFoodCourt} viewMenuText='메뉴보기' />
        </div>
      ))}
    </div>
  );
}
