import { Button, Center, Group, Loader, NumberInput, Select, Stack, Text, TextInput } from "@mantine/core";
import { IconArrowForwardUp, IconLink, IconX } from "@tabler/icons";
import { useEffect, useState } from "react"
import { NavigationProgress, setNavigationProgress } from "@mantine/nprogress";
import useLanguagePicker from "./languagePicker";
import Back from "./back";
import { useForm } from "@mantine/form";
import { apiCall } from "./api";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import iso from "iso-639-1"

const pages = 4
const minLoadingTime = 1500

const testConnection = async (values: any, setPage: Function, page: number) => {
    apiCall("POST", "/api/db/test-conn", values).then(resp => {
        if (resp.success) {
            if (resp.schemaAvailable) {
                const d = new Date()
                setPage(page + 0.5)
                apiCall("POST", "/api/db/connect", values).then(resp2 => {
                    const d2 = new Date()
                    if (resp2.success) {
                        if (d2.getTime() - d.getTime() < minLoadingTime) {
                            setTimeout(() => {
                                setPage(page + 1)
                            }, minLoadingTime - (d2.getTime() - d.getTime()))
                        } else {
                            setPage(page + 1)
                        }
                    } else {
                        showNotification({ title: "Error!", message: "Something went wrong...", icon: <IconX />, color: 'red' })
                    }
                })
            } else {
                showNotification({ title: "Schema already exists!", message: "The schema name is already in use!", icon: <IconX />, color: 'red' })
            }
        } else {
            showNotification({ title: "Can't connect!", message: "Please make sure everything is correct.", icon: <IconX />, color: 'red' })
        }
    })
}

const SetupScreen = ({ envInfo }: { envInfo: any }) => {
    const lp = useLanguagePicker()
    const [page, setPage] = useState(0)
    const router = useRouter()
    const [currencies, setCurrencies] = useState<Array<string>>([])

    const dbform = useForm({
        initialValues: {
            'host': '',
            'port': 3306,
            'user': '',
            'password': '',
            'schema': 'ors',
        },
        validate: {
            'schema': (val) => /^[A-z0-9]{1,64}$/.test(val) ? null : 'Invalid schema name!'
        }
    })

    const rform = useForm({
        initialValues: {
            'name': '',
            'currency': '',
        },
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrencies((Intl as any).supportedValuesOf('currency').map((item: string) => ({ label: item, value: item })))
        }
    }, [])

    useEffect(() => {
        setNavigationProgress(page / pages * 100)
    }, [page])

    useEffect(() => {
        if (!envInfo.missing) { return }

        // Skip database setup, if it's already been done.
        if (envInfo.missing.filter((item: string) => ['MYSQL_HOST', 'MYSQL_USER', 'MYSQL_PASSWORD', 'MYSQL_SCHEMA'].includes(item)).length === 0) {
            setPage(3)
        }
    }, [envInfo])

    return (<Center sx={{ height: '100%' }}>
        <Group m='sm' style={{ position: 'fixed', top: 0, left: 0 }}>
            {page ? <Back onClick={page === 0 ? () => { } : () => setPage(Math.round(page - 1))} /> : <></>}
        </Group>
        <div style={{ display: page === 0 ? 'initial' : 'none' }}>
            <Text size="xl">Welcome to the Open Restaurant System!</Text>
            <Text>There&apos;s a few more things we need to do before you&apos;re good to go!</Text>
            <Button mt={6} onClick={() => { setPage(page + 1) }} size="lg" leftIcon={<IconArrowForwardUp />}>Continue</Button>
        </div>
        <div style={{ display: page === 1 ? 'initial' : 'none' }}>
            <Text size="xl" mb={6}>Language</Text>
            <lp.LanguagePicker />
            <Button sx={{ width: '100%' }} mt='md' onClick={() => { setPage(page + 1) }} size="lg" leftIcon={<IconArrowForwardUp />}>Continue</Button>
        </div>
        <div style={{ display: page === 2 ? 'initial' : 'none' }}>
            <Text size="xl">Database</Text>
            <form onSubmit={dbform.onSubmit(() => testConnection(dbform.values, setPage, page))} autoComplete="off">
                <Stack spacing='sm'>
                    <TextInput required label="Host" placeholder="127.0.0.1" {...dbform.getInputProps("host")} />
                    <NumberInput description="MySQL default: 3306" required label="Port" min={0} max={65535} {...dbform.getInputProps("port")} />
                    <TextInput required label="User" placeholder="root" {...dbform.getInputProps("user")} />
                    <TextInput required label="Password" type="password" {...dbform.getInputProps("password")} />
                    <TextInput maxLength={64} description="Automatically generated." required label="Schema" placeholder="ors" {...dbform.getInputProps("schema")} />
                </Stack>
                <Button type="submit" mt='md' sx={{ width: '100%' }} size="lg" leftIcon={<IconLink />}>Test connection</Button>
            </form>
        </div>
        <div style={{ display: page === 2.5 ? 'initial' : 'none' }}>
            <Stack align="center" justify="center">
                <Text align="center">Generating Schema</Text>
                <Loader />
            </Stack>
        </div>
        <div style={{ display: page === 3 ? 'initial' : 'none' }}>
            <Text size="xl">Restaurant</Text>
            <form autoComplete="off" onSubmit={rform.onSubmit(() => {
                setPage(page + 1)
                apiCall("POST", "/api/setup/restaurant", rform.values).then(resp => {
                    if (resp.success) {
                        router.push(router.asPath)
                    }
                })
            })}>
                <Stack spacing='sm'>
                    <TextInput required label="Name" placeholder="Chili's" {...rform.getInputProps("name")} />
                    <Select label="Currency" placeholder="USD" searchable data={currencies} {...rform.getInputProps("currency")} />
                </Stack>
                <Button type="submit" mt='md' sx={{ width: '100%' }} size="lg" leftIcon={<IconArrowForwardUp />}>Finish</Button>
            </form>
        </div>
        <div style={{ display: page === 4 ? 'initial' : 'none' }}>
            <Stack align="center" justify="center">
                <Text align="center">Finalization...</Text>
                <Loader />
            </Stack>
        </div>
        <NavigationProgress />
    </Center>)
}

export default SetupScreen