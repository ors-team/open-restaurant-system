import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Code, Group, MantineProvider, Text } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { useLocalStorage } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import Head from 'next/head'

const renderTime = (date: Date) => {
  let dateArr = [date.getHours(), date.getMinutes()]
  return dateArr.map(d => d.toString().padStart(2, '0')).join(':')
}

function MyApp({ Component, pageProps }: AppProps) {
  const deviceIdentifier = useLocalStorage({ key: 'device-identifier', defaultValue: (new Date()).getTime() })
  const date = useState(new Date())

  useEffect(() => {
    setInterval(() => {
      date[1](new Date())
    }, 250)
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
    <NotificationsProvider>
      <Group p='sm' position='right' sx={{ display: 'fixed', top: 0, right: 0 }}>
        <Code sx={{ fontSize: '1.2rem', userSelect: 'none' }}>{renderTime(date[0])}</Code>
      </Group>
      <Group sx={{ position: 'fixed', top: 0, width: '100vw' }}>
        <Component {...pageProps} />
      </Group>
    </NotificationsProvider>
  </MantineProvider>)
}

export default MyApp
