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
    message: string,
    onClose: () => void,
    action?: () => void
}

const StyledSnackbar = styled(JoySnackbar)`
    display: flex;
    padding: 25px;
    margin-bottom: 20px;
    border-radius: 10px;
    font-family: inherit;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
`

const ActionIcon = (props: SnackbarProps) => (
    props.success ? <FiArrowRight
        className={"text-green-600 hoverabe hover:text-green-700 pointer"}
        onClick={props.action} size={"24px"}
    /> : <FiX
        className={"text-info-red hoverable hover:text-red-700 pointer"}
        onClick={props.onClose} size={"24px"}
    />
)

const Snackbar = (props: SnackbarProps) => {

    const textClassName = props.success ? "text-green-600" : "text-info-red"

    return (
        <StyledSnackbar
            {...props}
            variant={"soft"}
            endDecorator={<ActionIcon {...props}/>}
            color={props.success ? "success" : "danger"}
            anchorOrigin={{vertical: "bottom", horizontal: "right"}}
        >
            <section className={"flex flex-col"}>
                <Text text={props.header} className={cn("text-lg font-medium", textClassName)}/>
                <Text text={props.message} className={cn("text-base", textClassName)}/>
            </section>
        </StyledSnackbar>
    );

};

export default Snackbar;