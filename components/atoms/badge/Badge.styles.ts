import { chakra, Flex } from "@chakra-ui/react"

export const Container = chakra(Flex, {
    base: {
        width: "fit-content",
        paddingX: "4px",
        height: "16px",
        borderRadius: "50%",
        alignItems: "end",
        justifyContent: "center",
    }
})