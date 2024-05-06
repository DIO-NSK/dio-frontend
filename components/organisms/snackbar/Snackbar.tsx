import React from 'react';
import {Snackbar as JoySnackbar} from "@mui/joy"
import Text from "@/components/atoms/text/text-base/Text";
import {cn} from "@/utlis/cn";
import styled from "styled-components";
import {FiArrowRight, FiX} from "react-icons/fi";

type SnackbarProps = {
    success: boolean,
    open: boolean,
    header: string,
    onClose: () => void,
    message?: string,
    action?: () => void,
    autoHide?: boolean,
}

const HIDE_DURATION = 3000

const StyledSnackbar = styled(JoySnackbar)`
    display: flex;
    padding: 25px;
    margin-bottom: 20px;
    border-radius: 10px;
    gap: 20px;
    font-family: inherit;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const ActionIcon = (props: SnackbarProps) => (
    props.success ? <FiArrowRight
        className={"text-green-600 hoverabe hover:text-green-700 pointer"}
        onClick={() => props?.action ? props.action() : props.onClose()} size={"24px"}
    /> : <FiX
        className={"text-info-red hoverable hover:text-red-700 pointer"}
        onClick={props.onClose} size={"24px"}
    />
)

const Snackbar = ({autoHide = true, ...props}: SnackbarProps) => {

    const textClassName = props.success ? "text-green-600" : "text-info-red"

    return (
        <StyledSnackbar
            {...props}
            variant={"soft"}
            color={props.success ? "success" : "danger"}
            anchorOrigin={{vertical: "bottom", horizontal: "right"}}
            autoHideDuration={autoHide ? HIDE_DURATION : null}
        >
            <section className={"flex flex-col gap-2"}>
                <div className={"w-full flex items-center justify-between"}>
                    <Text text={props.header} className={cn("text-lg font-medium", textClassName)}/>
                    <ActionIcon {...props}/>
                </div>
                {props.message && <Text
                    className={cn("text-base max-w-[400px]", textClassName)}
                    text={props.message}
                />}
            </section>
        </StyledSnackbar>
    );

};

export default Snackbar;