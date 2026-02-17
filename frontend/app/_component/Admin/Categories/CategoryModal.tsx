import { CategoryFormInput } from '@/app/_schema/createCategory';
import { Category } from '@/app/_types/admin/category.type';
import { Save } from 'lucide-react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import Modal from '../Modal';

interface CategoryModalProps {
    isOpen: boolean;
    editingCategory: Category | null;
    register: UseFormRegister<CategoryFormInput>
    errors: FieldErrors<CategoryFormInput>;
    isSubmitting: boolean;
    categories: Category[];
    onClose: () => void;
    onSubmit: () => void;
}

export default function CategoryModal({
    isOpen,
    editingCategory,
    register,
    errors,
    isSubmitting,
    categories,
    onClose,
    onSubmit,
}: CategoryModalProps) {
    if (!isOpen) return null;

    const getParentOptions = (): Category[] => {
        if (!editingCategory) {
            return categories.filter((cat) => cat.level < 3);
        }
        return categories.filter((cat) => cat.level < editingCategory.level);
    };
    return (
        <Modal title={editingCategory ? 'Edit Category' : 'Add New Category'} closeModal={onClose}>
            <form onSubmit={onSubmit} className="p-5">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-(--text-color) mb-2">
                            Category Name *
                        </label>
                        <input
                            type="text"
                            {...register('name')}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-(--text-color) text-(--text-color)"
                            placeholder="Enter category name"
                            disabled={isSubmitting}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-(--text-color) mb-2">
                            Parent Category
                        </label>
                        <select
                            {...register('parentId')}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-(--text-color) text-(--text-color)"
                            disabled={isSubmitting}
                        >
                            <option value="">None (Main Category)</option>
                            {getParentOptions().map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {'—'.repeat(cat.level)} {cat.name} (Level {cat.level})
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-1">
                            Maximum category depth is 3 levels (0-3)
                        </p>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                {...register('isActive')}
                                className="w-4 h-4 rounded focus:ring-2 focus:ring-(--text-color)"
                                disabled={isSubmitting}
                            />
                            <span className="text-sm font-medium text-(--text-color)">Active</span>
                        </label>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-5">
                    <button
                        type="submit"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded text-white transition-colors bg-(--modal-btn-bg) hover:bg-(--modal-btn-bg-hover)"
                        disabled={isSubmitting}
                    >
                        <Save className="w-4 h-4" />
                        {editingCategory ? `${isSubmitting ? 'udpating...' :
                            'update'}` : `${isSubmitting ? 'creating...' :
                                'create'}`}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded text-(--text-color) hover:bg-gray-50 transition-colors"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    )
}
