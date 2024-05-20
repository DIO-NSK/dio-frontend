import {attach, createEffect, createEvent, createStore, sample} from "effector";
import {api, unauthorizedApi} from "@/api";
import {Section} from "@/types/dto/Section";
import {CreateSectionData} from "@/schemas/admin/CreateSectionSchema";
import {TableRow} from "@/types/dto/Table";
import {TextLink} from "@/types/dto/text";
import {DragEndEvent} from "@dnd-kit/core";
import {handleDragEnd} from "@/utlis/handlers/handleDragEnd";

export const $sections = createStore<Section[]>([])
export const pageDidMountEvent = createEvent()
export const $createSectionError = createStore<string>("")

export const cancelChangesEvent = createEvent<void>()
export const saveChangesEvent = createEvent<void>()

// section to delete
export const selectSectionToDeleteEvent = createEvent<TableRow<string[]>>()
export const onCloseSectionToDeleteEvent = createEvent()
export const $sectionToDelete = createStore<TableRow<string[]> | null>(null)
export const changeOrderEvent = createEvent<DragEndEvent>()

// section to edit
export const selectSectionToEditEvent = createEvent<TableRow<string[]>>()
export const onCloseSectionToEditEvent = createEvent()
export const $sectionToEdit = createStore<TableRow<string[]> | null>(null)

export const editSectionEvent = createEvent<{ sectionId: number, newName: string }>()
export const deleteSectionEvent = createEvent<number>()
export const onChangeNameToSearch = createEvent<string>()
export const $nameToSearch = createStore<string>("")

const createSection = async (sections: Section[]) => {
    return unauthorizedApi.post('/admin/catalogue', sections)
        .then(response => response.data)
}

const getSections = async () => {
    return api.get('/admin/catalogue')
        .then(response => response.data)
        .catch(exception => exception)
}

const getSectionBreadcrumbs = async (categoryId: number): Promise<{ id: number, name: string }> => {
    return api.get("/catalogue/breadcrumb/section", {params: {sectionId: categoryId}})
        .then(response => ({id: categoryId, name: response.data}))
}

export const getSectionBreadcrumbsFx = createEffect(getSectionBreadcrumbs)
export const getSectionBreadcrumbsEvent = createEvent<number>()

sample({
    clock: getSectionBreadcrumbsEvent,
    target: getSectionBreadcrumbsFx
})

export const $adminSectionBreadcrumbs = createStore<TextLink[]>([])
$adminSectionBreadcrumbs.on(getSectionBreadcrumbsFx.doneData, (_, section) => [
    {text: "Разделы", link: "/admin/catalog"},
    {text: section.name, link: `/admin/catalog/section/${section.id}`},
] as TextLink[])


const getSectionsFx = createEffect(getSections)
const updateSectionsFx = createEffect(createSection)

export const createSectionFx = attach({
    effect: updateSectionsFx,
    source: $sections,
    mapParams: (formData: CreateSectionData, sections: Section[]) => {
        const section: Section = {name: formData.section} as Section
        return [...sections, section]
    }
})

$sectionToDelete.on(selectSectionToDeleteEvent, (_, section) => section)
$sectionToDelete.on(onCloseSectionToDeleteEvent, () => null)

$sectionToEdit.on(selectSectionToEditEvent, (_, section) => section)
$sectionToEdit.on(onCloseSectionToEditEvent, () => null)

$sections.on(editSectionEvent, (sections, data) => handleChangeSectionName(data, sections))
$sections.on(deleteSectionEvent, (sections, sectionId) => handleFilterSectionsOnDelete(sectionId, sections))

$sections.on(changeOrderEvent, (sections, event) => {
    const newItems = handleDragEnd(event, sections)
    console.log(newItems)
    return newItems
})

$sections.on(getSectionsFx.doneData, (_, sections) => sections)
$createSectionError.on(updateSectionsFx.failData, _ => "Возникли ошибки при создании категории.")
$nameToSearch.on(onChangeNameToSearch, (_, value) => value)

const handleFilterSectionsOnDelete = (sectionId: number, sections: Section[]) => {
    return sections.filter(sec => sec.id !== sectionId)
}

const handleChangeSectionName = (data: { sectionId: number, newName: string }, sections: Section[]) => {
    return sections.map(sec => {
        if (sec.id === data.sectionId) return {...sec, name: data.newName}
        else return sec
    })
}

sample({
    clock: saveChangesEvent,
    source: $sections,
    target: updateSectionsFx
})


sample({
    clock: [cancelChangesEvent, pageDidMountEvent, createSectionFx.doneData],
    target: getSectionsFx
})