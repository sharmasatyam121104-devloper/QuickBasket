import {  Drawer, Menu } from "antd";
import { PlusCircle, SendToBack, ShoppingBag } from "lucide-react";
import Link from "next/link";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

const MobileSidebar = ({ open, onClose }: MobileSidebarProps) => {
  return (
    <Drawer
      placement="left"
      open={open}
      onClose={onClose}
      size={290}
      className="lg:hidden min-h-screen! overflow-y-hidden!"
    >
      <Menu
        mode="inline"
        onClick={onClose} // menu click pe bhi close
        className="w-72! border-0!  h-200 -ml-6! space-y-4! py-4!"
        items={[
          {
            key: "add",
            label: <Link href={'/admin/add-grocery'} className="flex! items-center! gap-2 text-lg font-medium h-44! "><PlusCircle size={24}/>Add Groceries</Link>,
          },
          {
            key: "viwe",
            label: <Link href="/" className="flex! items-center! gap-2 text-lg font-medium my-4!"><ShoppingBag size={24}/>Viwe Groceries</Link>,
          },
          {
            key: "mange",
            label: <Link href="/" className="flex! items-center! gap-2 text-lg font-medium my-4!"><SendToBack size={24}/>Manage Order&apos;s</Link>,
          },
        ]}
      />
    </Drawer>
  );
};

export default MobileSidebar;
