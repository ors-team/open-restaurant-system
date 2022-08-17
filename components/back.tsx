import { ActionIcon } from "@mantine/core"
import { IconArrowBackUp } from "@tabler/icons"
import { useRouter } from "next/router"
import { MouseEventHandler } from "react"

const Back = ({ onClick }: { onClick?: MouseEventHandler }) => {
    const router = useRouter()
    return (<ActionIcon onClick={onClick} size='xl' variant='filled'>
        <IconArrowBackUp size={30} />
    </ActionIcon>)
}

export default Back