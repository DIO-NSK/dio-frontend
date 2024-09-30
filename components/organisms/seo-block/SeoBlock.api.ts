import { api } from "@/api"

export const getSeoById = (id: number) => {
    return api.get('/seo', { params: { id: id } })
        .then(response => response.data)
}