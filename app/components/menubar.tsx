import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AppBar, Button, MenuList, MenuListItem, Separator, TextInput, Toolbar } from "react95";

export default function MenuBar() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    return (
        <AppBar position="fixed">
            <Toolbar style={{ justifyContent: 'space-between' }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <Button
                        onClick={() => setOpen(!open)}
                        active={open}
                        style={{ fontWeight: 'bold' }}
                    >
                        <span
                            style={{ height: '20px', marginRight: 4 }}
                        >🪟</span>
                        Start
                    </Button>
                    {open && (
                        <MenuList
                            style={{
                                position: 'absolute',
                                left: '0',
                                top: '100%'
                            }}
                            onClick={() => setOpen(false)}>

                            <MenuListItem>
                                <a href="https://github.com/testiautomaatio/rpa-exercise-legacy-system" target="_blank">
                                    📁 GitHub
                                </a>
                            </MenuListItem>
                            <Separator />
                            <MenuListItem>
                                <a href="/" onClick={(e) => { e.preventDefault(); navigate('/') }}>🔙 Logout</a>
                            </MenuListItem>
                        </MenuList>
                    )}
                </div>

                <Clock />
            </Toolbar>
        </AppBar>
    );
}

function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    const strTime = time.getHours() + ':' + leftPad(time.getMinutes()) + ':' + leftPad(time.getSeconds());
    const strDate = time.getDate() + '.' + (time.getMonth() + 1) + '.' + (time as any).getYear();
    return (
        <TextInput value={strTime + "   " + strDate} />
    );
}

function leftPad(num: number) {
    return num < 10 ? '0' + num : num;
}