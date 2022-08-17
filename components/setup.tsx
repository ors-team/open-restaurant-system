import { Button, Center, Group, NumberInput, Stack, Text, TextInput } from "@mantine/core";
import { IconArrowForwardUp, IconLink, IconX } from "@tabler/icons";
import { useEffect, useState } from "react"
import { NavigationProgress, setNavigationProgress } from "@mantine/nprogress";
import useLanguagePicker from "./languagePicker";
import Back from "./back";
import { useForm } from "@mantine/form";
import { apiCall } from "./api";
import { showNotification } from "@mantine/notifications";

const pages = 3

const testConnection = async (values: any, nextPageAction: Function) => {
    apiCall("POST", "/api/test-db", values).then(resp => {
        if (resp.success) {
            nextPageAction()
        } else {
            showNotification({ title: "Can't connect!", message: "Please make sure everything is correct.", icon: <IconX />, color: 'red' })
        }
    })
}

const SetupScreen = () => {
    const lp = useLanguagePicker()
    const [page, setPage] = useState(0)
    const form = useForm({
        'initialValues': {
            'host': '',
            'port': 3306,
            'user': '',
            'password': '',
            'schema': 'ors',
        }
    })
    useEffect(() => {
        setNavigationProgress(page / pages * 100)
    }, [page])

    return (<Center sx={{ height: '100%' }}>
        <Group m='sm' style={{ position: 'fixed', top: 0, left: 0 }}>
            {page ? <Back onClick={page === 0 ? () => { } : () => setPage(page - 1)} /> : <></>}
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
            <form onSubmit={form.onSubmit(() => testConnection(form.values, () => setPage(page + 1)))} autoComplete="off">
                <Stack spacing='sm'>
                    <TextInput required label="Host" placeholder="127.0.0.1" {...form.getInputProps("host")} />
                    <NumberInput description="MySQL default: 3306" required label="Port" min={0} max={65535} {...form.getInputProps("port")} />
                    <TextInput required label="User" placeholder="root" {...form.getInputProps("user")} />
                    <TextInput required label="Password" type="password" {...form.getInputProps("password")} />
                    <TextInput description="Automatically generated." required label="Schema" placeholder="ors" {...form.getInputProps("schema")} />
                </Stack>
                <Button type="submit" mt='md' sx={{ width: '100%' }} size="lg" leftIcon={<IconLink />}>Test connection</Button>
            </form>
        </div>
        <NavigationProgress />
    </Center>)
}

export default SetupScreen