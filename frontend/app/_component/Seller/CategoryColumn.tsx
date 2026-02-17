import { Category } from "@/app/_types/admin/category.type";
import { CiBookmark } from "react-icons/ci";

// CategoryColumn.tsx
type Props = {
    level: number
    items: Category[];
    selected: string | null;
    onClick: (id: string, name: string) => void;
};

export default function CategoryColumn({ level, items, selected, onClick }: Props) {
    return (
        <div className={`bg-white w-48 shadow rounded overflow-y-auto ${level === 0 ? "max-h-[400px]" : "max-h-[250px]"} pr-4`}>
            <ul>
                {level === 0 && (
                    <li className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-600 ">
                        <CiBookmark />
                        Your Categories
                    </li>
                )}
                {items.map((item) => (
                    <li
                        key={item._id}
                        onClick={() => onClick(item._id, item.name)}
                        className={`px-4 py-2 cursor-pointer text-sm text-(--text-color) relative
                        ${selected === item._id
                                ? "ribbon-active shadow-md"
                                : "hover:bg-gray-100"
                            }`}
                    >
                        {item.name}
                    </li>

                ))}
            </ul>
        </div>
    );
}
