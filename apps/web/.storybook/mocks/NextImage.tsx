import type { ImgHTMLAttributes } from 'react';

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string | { src: string };
  priority?: boolean;
  fill?: boolean;
};

// 스토리북에서는 이미지 최적화 없이 img로 그려요
export default function Image({
  src,
  priority: _priority,
  fill: _fill,
  ...props
}: ImageProps) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={typeof src === 'string' ? src : src.src} {...props} />;
}
