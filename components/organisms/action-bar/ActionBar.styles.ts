import { ActionBarContent, chakra } from "@chakra-ui/react";

export const Content = chakra(ActionBarContent, {
    base: {
        position: 'fixed',
        zIndex: '1000',
        bottom: '0px',
        left: '0px',
        display: "inline-flex",
        alignItems: 'center',
        justifyContent: "space-between",
        width: '100%',
        borderRadius: "0px",
        padding: '20px',
    }
})