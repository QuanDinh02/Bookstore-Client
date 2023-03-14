import React, { useState } from "react";

import {RiHome4Line,RiBook2Line} from "react-icons/ri";
import {IoStorefrontOutline} from "react-icons/io5";
import {MdSecurity, MdChecklistRtl, MdOutlineHomeWork} from "react-icons/md";
import {RxPerson} from "react-icons/rx";
import {GoPackage} from "react-icons/go";
import {RiListCheck2} from "react-icons/ri";
import {CgUserList, CgUserAdd} from "react-icons/cg";
import {BiCategoryAlt} from "react-icons/bi";
import {BsFileEarmarkPerson} from "react-icons/bs";

import {
    Sidebar,
    SubMenu,
    Menu,
    MenuItem
} from "react-pro-sidebar";

import './SideBars.scss';

const Sidebars = (props) => {

    return (
        <div className="sidebar-container">
            <Sidebar transitionDuration={700}>
                <Menu>
                    <MenuItem>
                        <div className="sidebar-logo">
                            MegaBook.com
                        </div>
                    </MenuItem>
                    <hr />
                </Menu>
                <Menu>
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
