import { DormMenuPage, DormMenuPageProps } from '@/page/dorm';

import { generateDormDayParams } from '@/features/dorm/api/generateStaticParams';



export function generateStaticParams() {
  return generateDormDayParams();
}

const Page = async (props: DormMenuPageProps) => {
  return <DormMenuPage {...props} />;
};

export default Page;
