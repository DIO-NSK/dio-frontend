import {useRouter, useSearchParams} from "next/navigation";

export const usePushSearchParams = (pathname : string, key : string, value : string) => {

    const router = useRouter();
    const searchParams = useSearchParams()

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set(key, value)
    const search = current.toString()
    const query = search ? `?${search}` : ""

    return () => router.push(`${pathname}${query}`)

}