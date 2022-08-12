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

    return (<Code sx={{ fontSize: '2rem' }}>{renderTime(date[0])}</Code>)
}

export default Clock