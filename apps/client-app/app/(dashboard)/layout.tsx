import { SidebarItem } from "../../components/SidebarItems";
import { HomeIcon } from "../../components/svg/HomeIcon";
import { TransactionIcon } from "../../components/svg/TransactionIcon";
import { TransferIcon } from "../../components/svg/TransferIcon";
import {PtoPIcon} from '../../components/svg/ptopIcon'

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex">
        <div className="w-72 border-r border-slate-300 min-h-screen mr-4 pt-28">
            <div>
                <SidebarItem href={"/dashboard"} icon={<HomeIcon />} title="Home" />
                <SidebarItem href={"/transfer"} icon={<TransferIcon />} title="Transfer" />
                <SidebarItem href={"/transactions"} icon={<TransactionIcon />} title="Transactions" />
                <SidebarItem href={"/p2p"} icon={<PtoPIcon/>} title="P2P Transfer" />
            </div>
        </div>
            {children}
    </div>
  );
}

// Icons Fetched from https://heroicons.com/



