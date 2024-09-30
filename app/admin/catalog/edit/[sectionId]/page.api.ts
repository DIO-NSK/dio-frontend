import { api } from "@/api"
import { Section } from "@/types/dto/Section"

export const getSectionById = (id: number): Promise<Section> => {
    return api.get('/admin/catalogue/section', { params: { sectionId: id } })
        .then(response => response.data)
}