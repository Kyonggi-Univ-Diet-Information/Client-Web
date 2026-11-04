export const useRouter = () => ({
  push: (_href: string) => {},
  replace: (_href: string) => {},
  back: () => {},
  forward: () => {},
  refresh: () => {},
  prefetch: (_href: string) => {},
});

export const usePathname = () => '/';
export const useSearchParams = () => new URLSearchParams();
export const useParams = () => ({});
