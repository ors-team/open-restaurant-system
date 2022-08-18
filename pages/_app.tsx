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
import Back from '../components/back';

const Clock = dynamic(() => import('../components/clock'), { ssr: false })

function MyApp({ Component, pageProps }: AppProps) {
  const deviceIdentifier = useLocalStorage({ key: 'device-identifier', defaultValue: (new Date()).getTime() })
  const [envInfo, setEnvInfo] = useState<any>({ success: true })
  const [lang, setLang] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLang(navigator.language)
    }
  }, [])

  useEffect(() => {
    apiCall("GET", "/api/setup/env").then(resp => {
      setEnvInfo(resp)
    })
  }, [router])

  pageProps = {
    deviceIdentifier: deviceIdentifier[0],
    lang,
    envInfo,
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
      <Group p='sm' position='apart' style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 99 }}>
        {router.pathname !== '/' ? <Back onClick={() => router.back()} /> : <div />}
        <Clock />
      </Group>
      <div style={{ height: '100vh', width: '100vw', position: 'fixed', top: 0, right: 0 }}>
        {envInfo.success ? <Component {...pageProps} /> : <SetupScreen {...pageProps} />}
      </div>
    </NotificationsProvider>
  </MantineProvider>)
}

export default MyApp
