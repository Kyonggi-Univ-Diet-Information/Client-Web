import { motion } from 'motion/react';

export default function EntryLogoSection() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center pt-10'>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className='flex flex-col items-center'
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='relative mb-8 cursor-pointer'
        >
          <div className='bg-point/10 absolute inset-0 -m-6 rounded-[48px] blur-2xl' />
          <div className='bg-point size-26 flex shrink-0 items-center justify-center rounded-[32px] shadow-2xl shadow-orange-200'>
            <span className='font-gyeonggiTitleBold text-4xl text-white'>기밥</span>
          </div>
        </motion.div>

        <div className='text-center'>
          <h1 className='font-gyeonggiTitleBold mb-4 text-3xl tracking-tight text-gray-900'>
            기룡아 밥먹자!
          </h1>
          <p className='text-balance leading-relaxed text-gray-500'>
            경기대학교 교내식당 정보,
            <br />
            <span className='text-point font-semibold'>기밥</span>에서 찾아보자!
          </p>
        </div>
      </motion.div>
    </div>
  );
}
