import { useState } from 'react';
import { createStyles, UnstyledButton, Menu, Image, Group } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons';

const data = [
    { label: 'English', image: "/flags/gb.png", value: 'en' },
    { label: 'Hungarian', image: "/flags/hu.png", value: 'hu' },
];

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
    control: {
        width: 250,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 15px',
        borderRadius: theme.radius.md,
        border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]
            }`,
        transition: 'background-color 150ms ease',
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[opened ? 5 : 6]
                : opened
                    ? theme.colors.gray[0]
                    : theme.white,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        },
    },

    label: {
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,
    },

    icon: {
        transition: 'transform 150ms ease',
        transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
    },
}));

const useLanguagePicker = () => {
    const [opened, setOpened] = useState(true);
    const { classes } = useStyles({ opened });
    const [selected, setSelected] = useState(data[0]);
    return {
        'LanguagePicker': () => {
            const items = data.map((item) => (
                <Menu.Item
                    icon={<Image alt={item.label} src={item.image} width={30} />}
                    onClick={() => setSelected(item)}
                    key={item.label}
                >
                    {item.label}
                </Menu.Item>
            ));

            return (
                <Menu
                    radius="md"
                    width={250}
                >
                    <Menu.Target>
                        <UnstyledButton className={classes.control}>
                            <Group noWrap spacing="xs">
                                <Image alt={selected.label} src={selected.image} width={35} />
                                <span className={classes.label}>{selected.label}</span>
                            </Group>
                            <IconChevronDown size={16} className={classes.icon} stroke={1.5} />
                        </UnstyledButton>
                    </Menu.Target>
                    <Menu.Dropdown>{items}</Menu.Dropdown>
                </Menu>
            );
        },
        selected: selected.value,
    }
}

export default useLanguagePicker