import { Center, Container, Text, Title } from '@mantine/core';
import type { NextPage } from 'next'
import { ActionsGrid } from '../components/actionsGrid';
import { IconBox, IconHome, IconNote, IconPencil, IconSettings, IconToolsKitchen2 } from "@tabler/icons"
import { ActionsContainer } from '../components/actionsContainer';

const Home: NextPage = () => {
  return (<ActionsContainer icon={<IconHome />} title='open-restaurant-system'><ActionsGrid data={[
    { title: 'Orders', color: 'blue', icon: IconPencil, href: '/orders' },
    { title: 'Menu', color: 'orange', icon: IconToolsKitchen2, href: '/menu' },
    { title: 'Inventory', color: 'red', icon: IconBox, href: '/inventory' },
    { title: 'Settings', color: 'pink', icon: IconSettings, href: '/settings' },
  ]} /></ActionsContainer>)
}

export default Home;