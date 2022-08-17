import { createStyles, Card, Group, Text } from '@mantine/core';
import { ReactNode } from 'react';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
    title: {
        fontWeight: 600,
    },
}));

export function ActionsContainer({ children, title, icon }: { children: any, title?: string, icon?: ReactNode }) {
    const { classes } = useStyles();

    return (
        <Card withBorder radius="md" className={classes.card}>
            {title || icon ? <Group spacing={6} mb='sm' position="left">
                {icon}
                {title ? <Text className={classes.title}>{title}</Text> : <></>}
            </Group> : <></>}
            {children}
        </Card>
    );
}