import {useState} from "react";

export const useRequestStatus = (req: (...args: any) => Promise<any>) => {

    const [status, setStatus] = useState<boolean | undefined>()

    const reset = () => setStatus(undefined)

    return [status, reset] as const

}