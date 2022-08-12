import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Group, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications'
import { useLocalStorage } from '@mantine/hooks'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const Clock = dynamic(() => import('../components/clock'), { ssr: false })

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
      <Clock />
      <Group sx={{ position: 'fixed', top: 0, width: '100vw' }}>
        <Component {...pageProps} />
      </Group>
    </NotificationsProvider>
  </MantineProvider>)
}

export default MyApp
