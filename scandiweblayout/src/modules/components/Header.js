
import React from "react";
import {
    View,
    Text
} from "react-native";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { isMobile } from "react-device-detect";

const theme = createTheme({
    palette: {
        neutral: {
            main: '#000',
            contrastText: '#fff',
        },
    },
});

const Header = (props) => {
    return (
        <View style={{ backgroundColor: '#FFF', padding: 16, minHeight: 40 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 8 }}>
                <Text style={{ color: 'gray', fontSize: 28, fontWeight: '500' }}>{props.title}</Text>
                {!isMobile ?
                    <Stack direction="row" spacing={2}>
                        <ThemeProvider theme={theme}>
                            <Button id={props.action1Id} color="neutral" startIcon={props.action1Icon} variant='contained' onClick={props.action1}>{props.action1Text}</Button>
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                            <Button id={props.action2Id} color="error" startIcon={props.action2Icon} variant='outlined' onClick={props.action2}>{props.action2Text}</Button>
                        </ThemeProvider>
                    </Stack>
                    :
                    <Stack direction="row" spacing={1}>
                        <ThemeProvider theme={theme}>
                            <IconButton id={props.action1Id} color="neutral" onClick={props.action1}>{props.action1Icon}</IconButton>
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                            <IconButton id={props.action2Id} color="error" onClick={props.action2}>{props.action2Icon}</IconButton>
                        </ThemeProvider>
                    </Stack>
                }

            </View>
        </View>
    );
}


export default Header;