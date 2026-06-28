import { CampusTopMenu } from '@/widgets/campus';
import RecentReviewView from '@/widgets/review/RecentReviewView';

export default async function ReviewHomePage() {
  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
      <CampusTopMenu />
      <RecentReviewView />
    </div>
  );
}
