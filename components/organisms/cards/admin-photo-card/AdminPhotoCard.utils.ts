import {useState} from "react";
import {api} from "@/api";

const URL = '/admin/image/upload'

export const useAdminPhotoCard = () => {

    const [progress, setProgress] = useState<number | false>(false)
    const [isSuccess, setIsSuccess] = useState<boolean | undefined>(undefined)

    const reset = () => {
        setIsSuccess(undefined)
        setProgress(false)
    }

    const uploadForm = async (file: File) => {

        setIsSuccess(undefined)

        const formData = new FormData()
        formData.append('file', file)

        const response = await api.post(URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    const progress = (progressEvent.loaded / progressEvent.total) * 100;
                    setProgress(Math.round(progress));
                }
            }
        }).catch(e => e)

        if (response.status === 200) {
            setIsSuccess(true)
        } else setIsSuccess(false)

        return response.data

    };

    return {uploadForm, isSuccess, progress, reset}

}