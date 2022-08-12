import { Code, Group } from "@mantine/core"
import { useState, useEffect } from "react"

const renderTime = (date: Date) => {
    let dateArr = [date.getHours(), date.getMinutes(), date.getSeconds()]
    return dateArr.map(d => d.toString().padStart(2, '0')).join(':')
}

const Clock = ({ }: {}) => {
    const date = useState(new Date())

    useEffect(() => {
        setInterval(() => {
            date[1](new Date())
        }, 250)
    }, [])

    return (<Group p='sm' position='right' sx={{ display: 'fixed', top: 0, right: 0 }}>
        <Code sx={{ fontSize: '1.2rem', userSelect: 'none' }}>{renderTime(date[0])}</Code>
    </Group>)
}

export default Clock