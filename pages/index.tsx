import { Center, Container, Text, Title } from '@mantine/core';
import type { NextPage } from 'next'
import { ActionsGrid } from '../components/actionsGrid';
import { IconNote, IconPencil } from "@tabler/icons"

const Home: NextPage = () => {
  return (<Center sx={{ width: '100vw', height: '90vh' }}>
    <ActionsGrid title='ors.Menu' data={[
      { title: 'Place Orders', color: 'blue', icon: IconPencil, href: '/orders/in' },
      { title: 'Receive Orders', color: 'indigo', icon: IconNote, href: '/orders/in' }
    ]} />
  </Center>)
}

export default Home;