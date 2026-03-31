import { ReactNode } from "react";
import { BsShop } from "react-icons/bs";
import { FaAngleDown, FaBell } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { MdAssignmentReturn, MdHighQuality, MdOutlineInventory, MdPayment } from "react-icons/md";
import { PiHeadsetBold, PiShoppingBagFill } from "react-icons/pi";
import { HiDocumentCurrencyRupee } from "react-icons/hi2";
import { TbTransactionRupee } from "react-icons/tb";
import { LiaFileUploadSolid } from "react-icons/lia";
import { GrGallery } from "react-icons/gr";

type MenuItem = {
    name: string;
    icon: ReactNode;
    link: string;
};

export default function Sidebar() {
    const sidebarLinks: MenuItem[] = [
        { name: "Orders", icon: <PiShoppingBagFill />, link: "/orders" },
        { name: "Returns", icon: <MdAssignmentReturn />, link: "/returns" },
        { name: "Pricing", icon: <HiDocumentCurrencyRupee />, link: "/pricing" },
        { name: "Claims", icon: <TbTransactionRupee />, link: "/dashboard/products" },
        { name: "Inventory", icon: <MdOutlineInventory />, link: "/dashboard/products" },
        { name: "Catalog Uploads", icon: <LiaFileUploadSolid />, link: "/dashboard/products" },
        { name: "Image Bulk Upload", icon: <GrGallery />, link: "/dashboard/products" },
        { name: "Payment", icon: <MdPayment />, link: "/dashboard/products" },
        { name: "Quality", icon: <MdHighQuality />, link: "/dashboard/products" },
    ]
    return (
        <div className='fixed left-0 right-0 h-screen w-60 bg-(--sidebar-bg) shadow-lg text-(--sidebar-text) flex flex-col overflow-hidden'>
            <div className='w-full flex items-center justify-between px-4 py-4'>
                <div className="p-3 rounded-full bg-white"><BsShop className="text-blue-400 text-xl" /></div>
                <FaAngleDown className="text-xl cursor-pointer" />
            </div>
            <div className="w-full mt-2 border-t border-b border-gray-700">
                <div className="flex">
                    <div className="flex items-center gap-2 w-1/2 px-4 py-3 hover:bg-gray-800 cursor-pointer border-r border-gray-700">
                        <FaBell className="text-lg" />
                        <span className="text-sm font-medium">Notices</span>
                    </div>
                    <div className="flex items-center gap-2 w-1/2 px-4 py-3 hover:bg-gray-800 cursor-pointer">
                        <PiHeadsetBold className="text-lg" />
                        <span className="text-sm font-medium">Support</span>
                    </div>
                </div>
            </div>
            <div className="mt-2 w-full flex items-center gap-3 px-4 py-3 text-(--sidebar-link-text) hover:bg-(--sidebar-link-hover-bg)">
                <IoHome className="text-lg" />
                <span className="text-md font-medium">Home</span>
            </div>
            <div className="flex-1 overflow-y-auto">
                <div className="w-full flex items-center mt-2 px-4 py-3">
                    <span className="text-md font-medium">Manage Business</span>
                </div>
                <nav>
                    {sidebarLinks.map((link, index) => (
                        <div key={index} className=" w-full flex items-center gap-3 px-4 py-2 text-(--sidebar-link-text) hover:bg-(--sidebar-link-hover-bg)">
                            <i className="text-lg">{link.icon}</i>
                            <span className="text-md font-medium">{link.name}</span>
                        </div>
                    ))}
                </nav>
            </div>

            <div className="shrink-0 border-t border-gray-400 px-4 py-3 text-sm">
                <span className="px-4">meesho Supplier Hub</span>
            </div>
        </div>
    )
}
