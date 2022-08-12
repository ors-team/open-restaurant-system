import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ActionIcon, Center, Group, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications'
import { useLocalStorage } from '@mantine/hooks'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { IconArrowBackUp } from '@tabler/icons';
import { useRouter } from 'next/router';

const Clock = dynamic(() => import('../components/clock'), { ssr: false })

const Back = () => {
  const router = useRouter()
  return (<>{router.pathname !== '/' ? <ActionIcon size='xl' onClick={() => router.push('../')} variant='filled'>
    <IconArrowBackUp size={30} />
  </ActionIcon> : <div />}</>)
}

function MyApp({ Component, pageProps }: AppProps) {
  const deviceIdentifier = useLocalStorage({ key: 'device-identifier', defaultValue: (new Date()).getTime() })

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
