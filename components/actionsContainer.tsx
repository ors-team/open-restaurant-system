import { createStyles, Card, Group, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
    title: {
        fontWeight: 600,
    },
}));

export function ActionsContainer({ children, title }: { children: any, title?: string }) {
    const { classes } = useStyles();

    return (
        <Card sx={{ transform: 'scale(1.5)' }} withBorder radius="md" className={classes.card}>
            {title ? <Group mb='sm' position="apart">
                <Text className={classes.title}>{title}</Text>
            </Group> : <></>}
            {children}
        </Card>
    );
}