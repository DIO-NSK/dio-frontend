import {useRouter} from "next/navigation";
import {usePathname} from "next/navigation";

export const useNavigation = () => {

    const router = useRouter()
    const pathname = usePathname()

    function back() {
        router.back()
    }

    function push(path: string) {
        router.push(path)
    }

    function pushDeep(path : string) {
        router.push(pathname.concat(path))
    }

    return {
        back, push, pushDeep
    }

}