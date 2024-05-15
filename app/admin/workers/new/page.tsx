"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import React, {useState} from "react";
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import {useUnit} from "effector-react";
import {addWorkerFx} from "@/app/admin/workers/new/model";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import {CreateWorkerData, CreateWorkerSchema} from "@/schemas/admin/CreateWorkerSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import Snackbar from "@/components/organisms/snackbar/Snackbar";
import {useRouter} from "next/navigation";

const AddNewWorkerPage = () => {

    const router = useRouter()

    const methods = useForm<CreateWorkerData>({
        resolver: zodResolver(CreateWorkerSchema),
        mode: "onSubmit"
    })

    const addWorker = useUnit(addWorkerFx)
    const [addSuccess, setAddSuccess] = useState<string>('')
    const [addError, setAddError] = useState<string>('')

    const onSubmit = (fieldValues: FieldValues) => {
        addWorker(fieldValues as CreateWorkerData)
            .then(_ => setAddSuccess('Вы можете вернуться назад'))
            .catch(message => setAddError(message))
    }

    const workerInputData = [
        {
            labelText: "Имя сотрудника",
            placeholder: "Введите имя сотрудника",
            name: 'fullName'
        }, {
            labelText: "Номер телефона",
            placeholder: "+7 (000) 000-00-00",
            inputMask: "+9 (999) 999-99-99",
            name: 'phoneNumber'
        }
    ]

    return (
        <React.Fragment>
            <Snackbar
                success={true}
                header={'Сотрудник успешно добавлен!'}
                message={addSuccess}
                action={() => router.back()}
                open={addSuccess.length !== 0}
                onClose={() => setAddSuccess('')}
            />
            <Snackbar
                success={false}
                header={'Возникли ошибки при создании работника'}
                message={addError}
                open={addError.length !== 0}
                onClose={() => setAddError('')}
            />
            <HeaderRow
                theme={"bordered"}
                header={"Добавить сотрудника"}
                hasBackIcon
            />
            <FormProvider {...methods}>
                <section className={"px-7   w-full flex flex-row gap-7 border-b-2 pb-7 border-light-gray"}>
                    {workerInputData.map((inputData, key) =>
                        <ControlledTextInput{...inputData} key={key}/>
                    )}
                </section>
                <section className={"px-7 w-full flex flex-row gap-7 border-b-2 pb-7 border-light-gray"}>
                    <ControlledTextInput
                        classNames={{wrapper : 'w-1/2'}}
                        labelText={"Пароль"} isPassword={true} name={'password'}
                        placeholder={'Придумайте надёжный пароль'}
                    />
                </section>
                <Button
                    onClick={methods.handleSubmit(onSubmit)}
                    classNames={{button: "mx-7 w-[300px]"}}
                    icon={<FiPlus size={"20px"}/>}
                    text={"Добавить сотрудника"}
                />
            </FormProvider>
        </React.Fragment>
    );
};

export default AddNewWorkerPage;
