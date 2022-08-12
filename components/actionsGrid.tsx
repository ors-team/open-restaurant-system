import { createStyles, Card, Text, SimpleGrid, UnstyledButton, Anchor, Group, MantineColor, Space } from '@mantine/core';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

const useStyles = createStyles((theme) => ({
    itemTitle: {
        fontSize: '.8em',
        margin: '4px 10px',
    },

    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: theme.radius.md,
        height: 90,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'box-shadow 150ms ease, transform 100ms ease',

        '&:hover': {
            boxShadow: `${theme.shadows.md} !important`,
            transform: 'scale(1.05)',
        },
    },
}));

interface Action { title: string, color: MantineColor, icon: any, href: string }

export function ActionsGrid({ data }: { data: Array<Action> }) {
    const router = useRouter()
    const { classes, theme } = useStyles();

    const items = data.map((item) => (
        <UnstyledButton p={4} onClick={() => router.push(item.href)} key={item.title} className={classes.item}>
            <item.icon color={theme.colors[item.color][6]} size={32} />
            <Text className={classes.itemTitle} size="xs">
                {item.title}
            </Text>
        </UnstyledButton>
    ));

    return (<SimpleGrid cols={3} spacing='sm'>
        {items}
    </SimpleGrid>);
}