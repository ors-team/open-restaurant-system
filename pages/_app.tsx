import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ActionIcon, Center, Group, MantineProvider, Modal, Text } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications'
import { useLocalStorage } from '@mantine/hooks'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { IconArrowBackUp } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiCall } from '../components/api';

const Clock = dynamic(() => import('../components/clock'), { ssr: false })

const Back = () => {
  const router = useRouter()
  return (<>{router.pathname !== '/' ? <ActionIcon size='xl' onClick={() => router.push('../')} variant='filled'>
    <IconArrowBackUp size={30} />
  </ActionIcon> : <div />}</>)
}

function MyApp({ Component, pageProps }: AppProps) {
  const deviceIdentifier = useLocalStorage({ key: 'device-identifier', defaultValue: (new Date()).getTime() })
  const [envInfo, setEnvInfo] = useState<any>({})

  useEffect(() => {
    apiCall("GET", "/api/env").then(resp => {
      setEnvInfo(resp)
    })
  }, [])

  pageProps = {
    deviceIdentifier: deviceIdentifier[0],
    ...pageProps
  }

  return (<MantineProvider theme={{
    colorScheme: 'dark',
    fontFamily: 'Poppins',
  }}>
    <Head>
      <title>Open Restaurant System</title>
    </Head>
    <Modal withCloseButton={false} size="xl" title={<Text size="xl">Missing environment variables!</Text>} opened={!envInfo.success} onClose={() => { }}>
      <Text mb={6}>Please ask the administrator to configure the following envvars:</Text>
      <Text>{envInfo.missing?.join(", ")}</Text>
    </Modal>
    <NotificationsProvider>
      <Group p='sm' position='apart' sx={{ display: 'fixed', top: 0, left: 0, height: '7vh', width: '100vw', zIndex: 99 }} >
        <Back />
        <Clock />
      </Group>
      <Group sx={{ position: 'fixed', top: '12vh', height: '76vh', width: '100vw', zIndex: 1 }}>
        <Center sx={{ width: '100vw', height: '100%' }}>
          <Component {...pageProps} />
        </Center>
      </Group>
    </NotificationsProvider>
  </MantineProvider>)
}

export default MyApp
