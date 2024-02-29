import {createEffect, createEvent, createStore, sample} from "effector";
import {api} from "@/api";
import {Section} from "@/types/dto/Section";
import {CreateSectionData} from "@/schemas/admin/CreateSectionSchema";
import {TableRow} from "@/types/dto/Table";

export const submitFormEvent = createEvent<CreateSectionData>()
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

export const deleteSectionEvent = createEvent<number>()

export const onChangeNameToSearch = createEvent<string>()
export const $nameToSearch = createStore<string>("")

const createSection = async (sections: Section[]) => {
    return api.post('/admin/catalogue', sections)
        .then(response => response.data)
}

const getSections = async () => {
    return api.get('/admin/catalogue')
        .then(response => response.data)
        .catch(exception => exception)
}

const getSectionsFx = createEffect(getSections)
const updateSectionsFx = createEffect(createSection)

const createSectionEvent = sample({
    clock: submitFormEvent,
    source: $sections,
    fn: (sections: Section[], data: CreateSectionData) =>
        ({name: data.section, sequenceNumber: sections.length} as Section)
})

$sectionToDelete.on(selectSectionToDeleteEvent, (_, section) => section)
$sectionToDelete.on(onCloseSectionToDeleteEvent, () => null)

$sectionToEdit.on(selectSectionToEditEvent, (_, section) => section)
$sectionToEdit.on(onCloseSectionToEditEvent, () => null)

$sections.on(getSectionsFx.doneData, (_, sections) => sections)
$createSectionError.on(updateSectionsFx.failData, _ => "Возникли ошибки при создании категории.")
$nameToSearch.on(onChangeNameToSearch, (_, value) => value)

sample({
    clock: deleteSectionEvent,
    source: $sections,
    fn: (sections: Section[], sectionId: number) => sections.filter(sec => sec.id !== sectionId),
    target: $sections
})

sample({
    clock : saveChangesEvent,
    source : $sections,
    target : updateSectionsFx
})

sample({
    clock: createSectionEvent,
    source: $sections,
    fn: (sections, section) => [...sections, section],
    target: updateSectionsFx
})


sample({
    clock: [cancelChangesEvent, pageDidMountEvent, updateSectionsFx.doneData],
    target: getSectionsFx
})