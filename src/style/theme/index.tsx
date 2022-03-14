import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        heading: 'Kalam, serif',
        body: 'Roboto, sans-serif'
    },
    colors: {
        blue: {
            100: '#89C2D9',
            200: '#1E6091'
        },
        gray: {
            100: '#CED4DA'
        }
    }

})

export default theme