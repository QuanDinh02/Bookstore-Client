import React, { useState } from "react";

import { RiHome4Line, RiBook2Line } from "react-icons/ri";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdSecurity, MdChecklistRtl, MdOutlineHomeWork } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
import { GoPackage } from "react-icons/go";
import { RiListCheck2 } from "react-icons/ri";
import { CgUserList, CgUserAdd } from "react-icons/cg";
import { BiCategoryAlt } from "react-icons/bi";
import { BsFileEarmarkPerson } from "react-icons/bs";

import {
    Sidebar,
    SubMenu,
    Menu,
    MenuItem,
    menuClasses
} from "react-pro-sidebar";

import './SideBars.scss';

const themes = {
    light: {
        sidebar: {
            backgroundColor: '#06603A',
            color: '#ACCABE',
        },
        menu: {
            menuContent: '#087748',
            icon: '#FFFFFF',
            hover: {
                backgroundColor: '#2B7858',
                color: '#FFFFFF',
            },
            disabled: {
                color: '#9fb6cf',
            },
        }
    },
    dark: {
        sidebar: {
            backgroundColor: '#111726',
            color: '#FFFFFF',
        },
        menu: {
            menuContent: '#273240',
            icon: '#FFFFFF',
            hover: {
                backgroundColor: '#344153',
                color: '#26B668',
            },
            disabled: {
                color: '#000000',
            },
        }
    },
};

const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const Sidebars = (props) => {

    const [theme, setTheme] = useState('light');

    const menuItemStyles = {
        root: {
            fontSize: '1rem',
            fontWeight: 400,
        },
        icon: {
            color: themes[theme].menu.icon,
            [`&.${menuClasses.disabled}`]: {
                color: themes[theme].menu.disabled.color,
            }
        },
        SubMenuExpandIcon: {
            color: '#b6b7b9',
        },
        subMenuContent: ({ level }) => ({
            backgroundColor:
                level === 0
                    ? hexToRgba(themes[theme].menu.menuContent, 1)
                    : 'transparent',
        }),
        button: {
            [`&.${menuClasses.disabled}`]: {
                color: themes[theme].menu.disabled.color,
            },
            '&:hover': {
                backgroundColor: hexToRgba(themes[theme].menu.hover.backgroundColor, 1),
                color: themes[theme].menu.hover.color
            }
        },
        label: ({ open }) => ({
            fontWeight: open ? 600 : undefined,
        }),
    };

    return (
        <div className="sidebar-container">
            <Sidebar
                transitionDuration={700}
                backgroundColor={hexToRgba(themes[theme].sidebar.backgroundColor, 1)}
                rootStyles={{
                    color: themes[theme].sidebar.color,
                }}
            >
                
                <div className='sidebar-logo red-green d-flex justify-content-center align-items-center pt-3'>
                    Mega<span className="red-word">Book</span>.com
                </div>
                <hr />
                <Menu menuItemStyles={menuItemStyles}>
                    <MenuItem icon={<RiHome4Line />}>Dashboard</MenuItem>
                    <SubMenu defaultOpen label={"Store"} icon={<IoStorefrontOutline />}>
                        <MenuItem icon={<BiCategoryAlt />}>Books Category</MenuItem>
                        <MenuItem icon={<BsFileEarmarkPerson />}>Authors</MenuItem>
                        <MenuItem icon={<RiBook2Line />}>Books</MenuItem>
                        <MenuItem icon={<MdOutlineHomeWork />}>Publishers</MenuItem>
                    </SubMenu>
                    <SubMenu defaultOpen label={"User"} icon={<RxPerson />}>
                        <MenuItem icon={<CgUserList />}>User List</MenuItem>
                        <MenuItem icon={<CgUserAdd />}>User Add</MenuItem>
                    </SubMenu>
                    <SubMenu defaultOpen label={"Order"} icon={<GoPackage />}>
                        <MenuItem icon={<RiListCheck2 />}>Order List</MenuItem>
                    </SubMenu>
                    <SubMenu defaultOpen label={"Access"} icon={<MdSecurity />}>
                        <MenuItem icon={<MdChecklistRtl />}>Access Links</MenuItem>
                        <MenuItem icon={<RxPerson />}>User Group</MenuItem>
                    </SubMenu>
                </Menu>
            </Sidebar>
        </div>
    );
}
export default Sidebars;
