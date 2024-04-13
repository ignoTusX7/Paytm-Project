"use client";
import React, { useState } from "react";
import { SidebarItem } from "./SidebarItems";
import { TransferIcon } from "./svg/TransferIcon";
import { TransactionIcon } from "./svg/TransactionIcon";
import { PtoPIcon } from "./svg/ptopIcon";
import { HomeIcon } from "./svg/HomeIcon";
import { MenuIcon } from "./svg/MenuIcon";

export const Sidebar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <div className="">
      <div
        className="block md:hidden absolute right-0 cursor-pointer"
        onClick={() => setIsSideBarOpen(!isSideBarOpen)}
      >
        <MenuIcon />
      </div>
      <div
        className={`w-48 md:w-72 border-r border-slate-300 min-h-screen mr-4 pt-28 ${isSideBarOpen ? "block" : "hidden"} md:block`}
      >
        <div>
          <SidebarItem href={"/dashboard"} icon={<HomeIcon />} title="Home" />
          <SidebarItem
            href={"/transfer"}
            icon={<TransferIcon />}
            title="Transfer"
          />
          <SidebarItem
            href={"/transactions"}
            icon={<TransactionIcon />}
            title="Transactions"
          />
          <SidebarItem href={"/p2p"} icon={<PtoPIcon />} title="P2P Transfer" />
        </div>
      </div>
    </div>
  );
};
