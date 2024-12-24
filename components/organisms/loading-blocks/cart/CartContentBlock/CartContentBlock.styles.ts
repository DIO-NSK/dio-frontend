import { chakra, VStack } from "@chakra-ui/react"

export const Container = chakra(VStack, {
    base : {
        w : "full",
        alignItems : "start",
        gap : "28px"
    }
})

export const Divider = chakra.div;