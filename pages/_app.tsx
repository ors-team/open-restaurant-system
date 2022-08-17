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
import SetupScreen from '../components/setup';

const Clock = dynamic(() => import('../components/clock'), { ssr: false })

function MyApp({ Component, pageProps }: AppProps) {
  const deviceIdentifier = useLocalStorage({ key: 'device-identifier', defaultValue: (new Date()).getTime() })
  const [envInfo, setEnvInfo] = useState<any>({})
  const router = useRouter()

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
    cursorType: 'pointer',
    fontSizes: {
      'xs': 24,
      'sm': 26,
      'md': 28,
      'lg': 30,
      'xl': 32
    },
  }}
    withGlobalStyles withNormalizeCSS>
    <Head>
      <title>Open Restaurant System</title>
    </Head>
    <NotificationsProvider>
      <div style={{ height: '100vh', width: '100vw' }}>
        {envInfo.success ? <Component {...pageProps} /> : <SetupScreen />}
      </div>
    </NotificationsProvider>
  </MantineProvider>)
}

export default MyApp
