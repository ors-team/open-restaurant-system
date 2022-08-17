import { ActionIcon, Group, SimpleGrid } from "@mantine/core";
import { IconPencil, IconPlus, IconToolsKitchen2, IconTrash } from "@tabler/icons";
import type { NextPage } from "next";
import { useState } from "react";
import { ActionsContainer } from "../components/actionsContainer";

const Menu: NextPage = () => {
    const [menuItems, setMenuItems] = useState<Array<any>>([])

    return (<ActionsContainer title="Menu" icon={<IconToolsKitchen2 />}>
        <Group position="center" align="center">
            <ActionIcon size="lg" variant="filled" sx={(theme) => ({ boxShadow: theme.shadows.md })}>
                <IconPlus />
            </ActionIcon>
            <ActionIcon size="lg" variant="filled" sx={(theme) => ({ boxShadow: theme.shadows.md })}>
                <IconPencil />
            </ActionIcon>
            <ActionIcon size="lg" variant="filled" sx={(theme) => ({ boxShadow: theme.shadows.md })}>
                <IconTrash />
            </ActionIcon>
        </Group>
        <SimpleGrid cols={6}>
        </SimpleGrid>
    </ActionsContainer>)
}

export default Menu;