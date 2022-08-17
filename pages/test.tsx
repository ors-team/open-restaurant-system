import { Center, Container, Divider, Text, Title, useMantineTheme } from '@mantine/core';
import type { NextPage } from 'next'
import { ActionsGrid } from '../components/actionsGrid';
import { IconBox, IconHome, IconNote, IconPencil, IconSettings, IconToolsKitchen2 } from "@tabler/icons"
import { ActionsContainer } from '../components/actionsContainer';

const Home: NextPage = () => {
    const theme = useMantineTheme()
    console.log(theme.fontSizes)
    return (<>
        <Text mb="xl" size="xl">XL</Text>
        <Text mb="lg" size="lg">LG</Text>
        <Text mb="md" size="md">MD</Text>
        <Text mb="sm" size="sm">SM</Text>
        <Text mb="xs" size="xs">XS</Text>
    </>)
}

export default Home;