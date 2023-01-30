import { DefaultTheme } from "styled-components";
import { Button, Text, Stack } from '@mantine/core';

const dark: DefaultTheme = {
    color: {
        main: '#19dda3',
        white: '#ffffff',
        bg: '#373A40',
        placeholder: '#CED4DA',
        border: '#E9ECEF',
        text: '#E9ECEF',
        icon: '#1C7ED6',
        header: '#2C2E33',
    },
};

const light: DefaultTheme = {
    ...dark,
    color: {
        main: '#00f2ab',
        white: '#ffffff',
        bg: '#f0f0f0',
        placeholder: '#cccccc',
        border: '#cccccc',
        text: '#191919',
        icon: '#191919',
        header: '#ffffff',
    },
};

export {dark, light};