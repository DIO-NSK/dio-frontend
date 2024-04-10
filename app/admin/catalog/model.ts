import {attach, createEffect, createEvent, createStore, sample} from "effector";
import {api, unauthorizedApi} from "@/api";
import {Section} from "@/types/dto/Section";
import {CreateSectionData} from "@/schemas/admin/CreateSectionSchema";
import {TableRow} from "@/types/dto/Table";

export const $sections = createStore<Section[]>([])
export const pageDidMountEvent = createEvent()
export const $createSectionError = createStore<string>("")

export const cancelChangesEvent = createEvent<void>()
export const saveChangesEvent = createEvent<void>()

// section to delete
export const selectSectionToDeleteEvent = createEvent<TableRow<string[]>>()
export const onCloseSectionToDeleteEvent = createEvent()
export const $sectionToDelete = createStore<TableRow<string[]> | null>(null)

// section to edit
export const selectSectionToEditEvent = createEvent<TableRow<string[]>>()
export const onCloseSectionToEditEvent = createEvent()
export const $sectionToEdit = createStore<TableRow<string[]> | null>(null)

export const editSectionEvent = createEvent<{sectionId : number, newName : string}>()
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

const getSectionsFx = createEffect(getSections)
const updateSectionsFx = createEffect(createSection)

export const createSectionFx = attach({
    effect: updateSectionsFx,
    source: $sections,
    mapParams: (formData: CreateSectionData, sections: Section[]) => {
        const section: Section = {name: formData.section, sequenceNumber: sections.length + 1} as Section
        return [...sections, section]
    }
})

$sectionToDelete.on(selectSectionToDeleteEvent, (_, section) => section)
$sectionToDelete.on(onCloseSectionToDeleteEvent, () => null)

$sectionToEdit.on(selectSectionToEditEvent, (_, section) => section)
$sectionToEdit.on(onCloseSectionToEditEvent, () => null)

$sections.on(editSectionEvent, (sections, data) => handleChangeSectionName(data, sections))
$sections.on(deleteSectionEvent, (sections, sectionId) => handleFilterSectionsOnDelete(sectionId, sections))

$sections.on(getSectionsFx.doneData, (_, sections) => sections)
$createSectionError.on(updateSectionsFx.failData, _ => "Возникли ошибки при создании категории.")
$nameToSearch.on(onChangeNameToSearch, (_, value) => value)

const handleFilterSectionsOnDelete = (sectionId: number, sections: Section[]) => {
    return sections
        .filter(sec => sec.id !== sectionId)
        .map(sec => {
            if (sec.sequenceNumber > sectionId) {
                return {...sec, sequenceNumber: sec.sequenceNumber - 1} as Section
            } else return sec
        })
}

const handleChangeSectionName = (data : {sectionId : number, newName : string}, sections : Section[]) => {
    return sections.map(sec => {
        if (sec.id === data.sectionId) return {...sec, name : data.newName}
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