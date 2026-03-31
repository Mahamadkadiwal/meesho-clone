import SelectCategory from '@/app/_component/Seller/SelectCategory';
import { api } from '@/app/_lib/api';
import { Category } from '@/app/_types/admin/category.type';
import { Search } from 'lucide-react';

export default async function page() {
    const res = await api('/category');
    const categories: Category[] = res.data;
    return (
        <>
            {/* search cat  */}
            <div className="flex flex-col px-3 mb-4" >
                <h3 className="text-(--text-color) text-lg font-semibold">Search Category</h3>
                <div className="relative">
                    <Search className="w-5 h-5 absolute text-sm left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Try Sarees, Toys, Charger, Mugs and more..."
                        className="w-1/2 mt-2 pl-10 pr-4 text-sm py-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5a5d66] text-[#5a5d66]"
                    />
                </div>
            </div>

            {/* cat  */}
            < SelectCategory categories={categories} />
        </>
    )
}
