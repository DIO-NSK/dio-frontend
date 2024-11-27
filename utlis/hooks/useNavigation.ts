import { usePathname, useRouter } from "next/navigation";

export interface UseNavigationReturn {
  pushDeep: (path: string) => void;
  push: (path: string) => void;
  back: () => void;
}

export const useNavigation = (): UseNavigationReturn => {
  const router = useRouter();
  const pathname = usePathname();

  function back() {
    router.back();
  }

  function push(path: string) {
    router.push(path);
  }

  function pushDeep(path: string) {
    router.push(pathname.concat(path));
  }

  return {
    back,
    push,
    pushDeep,
  };
};
