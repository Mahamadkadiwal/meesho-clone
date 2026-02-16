'use client';

import CategoryCard from '@/app/_component/Admin/Categories/CategoryCard';
import CategoryModal from '@/app/_component/Admin/Categories/CategoryModal';
import SearchFilter from '@/app/_component/Admin/Categories/SearchFilter';
import { api } from '@/app/_lib/api';
import { CategoryFormInput, categorySchema } from '@/app/_schema/createCategory';
import { Category, FilterState } from '@/app/_types/admin/category.type';
import { createCategory, deleteCategory, editCategory } from '@/app/actions/category.action';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    ChevronDown,
    ChevronRight,
    ChevronsDown,
    ChevronsUp,
    Edit2,
    Eye,
    EyeOff,
    Plus,
    Trash2
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function Page() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CategoryFormInput>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
            parentId: null,
            isActive: true,
        },
    });

    const [filters, setFilters] = useState<FilterState>({
        level: 'all',
        status: 'all',
        searchQuery: '',
    });
    const [showFilters, setShowFilters] = useState(false);

    async function getCategory() {
        const cat = await api('/category');
        setCategories(cat.data);
    }

    useEffect(() => {
        getCategory();
    }, []);

    // Accordion functions
    const toggleCategory = (categoryId: string) => {
        setExpandedCategories((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(categoryId)) {
                newSet.delete(categoryId);
            } else {
                newSet.add(categoryId);
            }
            return newSet;
        });
    };

    const isExpanded = (categoryId: string) => {
        return expandedCategories.has(categoryId);
    };

    const allExpanded =
        categories.length > 0 &&
        categories.every((cat) => expandedCategories.has(cat._id));

    const toggleExpandAll = () => {
        if (allExpanded) {
            collapseAll();
        } else {
            expandAll();
        }
    };

    const expandAll = () => {
        const allCategoryIds = categories.map(cat => cat._id);
        setExpandedCategories(new Set(allCategoryIds));
    };

    const collapseAll = () => {
        setExpandedCategories(new Set());
    };


    // Filter categories
    const categoryMatchesFilters = (cat: Category): boolean => {
        // Level filter
        if (filters.level !== 'all' && cat.level !== parseInt(filters.level)) {
            return false;
        }

        // Status filter
        if (filters.status === 'active' && !cat.isActive) {
            return false;
        }
        if (filters.status === 'inactive' && cat.isActive) {
            return false;
        }

        // Search filter
        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            return (
                cat.name.toLowerCase().includes(query) ||
                cat.slug.toLowerCase().includes(query)
            );
        }

        return true;
    };

    const hasMatchingDescendant = (categoryId: string): boolean => {
        const children = categories.filter((cat) => cat.parentId === categoryId);

        for (const child of children) {
            if (categoryMatchesFilters(child) || hasMatchingDescendant(child._id)) {
                return true;
            }
        }

        return false;
    };

    const shouldShowCategory = (cat: Category): boolean => {
        return categoryMatchesFilters(cat) || hasMatchingDescendant(cat._id);
    };

    const filteredCategories = useMemo(() => {
        return categories.filter((cat) => shouldShowCategory(cat));
    }, [categories, filters]);

    const buildCategoryTree = (
        parentId: string | null = null,
        level: number = 0
    ): Category[] => {
        return categories
            .filter((cat) => {
                if (cat.parentId !== parentId) {
                    return false;
                }

                return shouldShowCategory(cat);
            })
            .sort((a, b) => a.name.localeCompare(b.name));
    };

    const hasChildren = (categoryId: string): boolean => {
        return categories.some((cat) => cat.parentId === categoryId && shouldShowCategory(cat));
    };

    const stats = useMemo(() => {
        return {
            total: categories.length,
            active: categories.filter((c) => c.isActive).length,
            inactive: categories.filter((c) => !c.isActive).length,
            byLevel: {
                0: categories.filter((c) => c.level === 0).length,
                1: categories.filter((c) => c.level === 1).length,
                2: categories.filter((c) => c.level === 2).length,
                3: categories.filter((c) => c.level === 3).length,
            },
        };
    }, [categories]);

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    async function onSubmit(data: CategoryFormInput) {
        const parentCategory = data.parentId
            ? categories.find((cat) => cat._id === data.parentId)
            : null;
        try {
            if (editingCategory) {


                const level = parentCategory ? parentCategory.level + 1 : 0;

                const res = await editCategory(editingCategory._id, { ...data, level });
                const udpateData = res.data;
                toast.success(udpateData?.message || 'Category updated successfully');
                setCategories(
                    categories.map((cat) =>
                        cat._id === udpateData._id ? udpateData : cat
                    )
                );
            } else {
                // Add new category
                const level = parentCategory ? parentCategory.level + 1 : 0;
                const res = await createCategory({ ...data, level });
                const newCategory = res.data;
                toast.success(newCategory?.message || 'Category Added successfully');
                setCategories([...categories, newCategory]);
            }

        } catch (error) {
            if (error instanceof Error)
                toast.error(error.message);
            else toast.error('Error occur');

        } finally {

            closeModal();
        }
    };

    const openAddModal = () => {
        setEditingCategory(null);
        reset({
            name: "",
            parentId: null,
            isActive: true,
        });
        setIsModalOpen(true);
    };

    const openEditModal = (category: Category) => {
        setEditingCategory(category);
        reset({
            name: category.name,
            parentId: category.parentId ?? null,
            isActive: category.isActive,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
        reset({
            name: "",
            parentId: null,
            isActive: true,
        });
    };

    const handleDelete = async (id: string) => {
        const hasChildren = categories.some((cat) => cat.parentId === id);
        if (hasChildren) {
            alert('Cannot delete category with subcategories. Delete children first.');
            return;
        }

        if (confirm('Are you sure you want to delete this category?')) {
            const res = await deleteCategory(id);
            toast.success(res.data?.message || 'Category deleted successfully');
            setCategories(categories.filter((cat) => cat._id !== id));
        }
    };

    const toggleStatus = (id: string) => {
        setCategories(
            categories.map((cat) =>
                cat._id === id
                    ? { ...cat, isActive: !cat.isActive, updatedAt: new Date() }
                    : cat
            )
        );
    };

    const resetFilters = () => {
        setFilters({
            level: 'all',
            status: 'all',
            searchQuery: '',
        });
    };

    const renderCategoryRow = (category: Category) => {
        const children = buildCategoryTree(category._id, category.level + 1);
        const matchesFilters = categoryMatchesFilters(category);
        const hasCategoryChildren = hasChildren(category._id);
        const categoryExpanded = isExpanded(category._id);

        return (
            <div key={category._id}>
                <div
                    className={`flex items-center justify-between p-3 border-b border-gray-100 transition-colors ${matchesFilters ? 'hover:bg-gray-50' : 'hover:bg-gray-50 opacity-60'
                        }`}
                >
                    <div className="flex items-center flex-1">
                        <div
                            style={{ marginLeft: `${category.level * 32}px` }}
                            className="flex items-center"
                        >
                            {hasCategoryChildren ? (
                                <button
                                    onClick={() => toggleCategory(category._id)}
                                    className="p-1 hover:bg-gray-200 rounded mr-1 transition-colors"
                                    title={categoryExpanded ? 'Collapse' : 'Expand'}
                                >
                                    {categoryExpanded ? (
                                        <ChevronDown className="w-4 h-4 text-gray-600" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4 text-gray-600" />
                                    )}
                                </button>
                            ) : (
                                <div className="w-6 mr-1" />
                            )}

                            <div>
                                <div className="flex items-center gap-2">
                                    <span className={`font-medium ${matchesFilters ? 'text-[#5a5d66]' : 'text-gray-400'}`}>
                                        {category.name}
                                        {!matchesFilters && <span className="text-xs ml-2 text-gray-400">(parent)</span>}
                                    </span>
                                    <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">
                                        Level {category.level}
                                    </span>
                                    <span
                                        className={`text-xs px-2 py-1 rounded ${category.isActive
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                            }`}
                                    >
                                        {category.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                    Slug: {category.slug}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => toggleStatus(category._id)}
                            className="p-2 hover:bg-gray-200 rounded transition-colors"
                            title={category.isActive ? 'Deactivate' : 'Activate'}
                        >
                            {category.isActive ? (
                                <Eye className="w-4 h-4 text-green-600" />
                            ) : (
                                <EyeOff className="w-4 h-4 text-gray-400" />
                            )}
                        </button>
                        <button
                            onClick={() => openEditModal(category)}
                            className="p-2 hover:bg-gray-200 rounded transition-colors"
                            title="Edit"
                        >
                            <Edit2 className="w-4 h-4 text-[#5a5d66]" />
                        </button>
                        <button
                            onClick={() => handleDelete(category._id)}
                            className="p-2 hover:bg-red-50 rounded transition-colors"
                            title="Delete"
                        >
                            <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                    </div>
                </div>

                {hasCategoryChildren && (
                    <div
                        className={`transition-all duration-400 ease-in-out overflow-hidden ${categoryExpanded ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        {children.map((child) => renderCategoryRow(child))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-(--bg-color)">
            <div className="max-w-7xl mx-auto p-4">
                <div className="px-6 pt-3 pb-1 bg-(--div-bg) shadow-sm rounded mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-(--text-color)">Manage Categories</h1>
                            <p className="text-gray-500 mt-1">
                                Create and organize your product categories
                            </p>
                        </div>
                        <button
                            onClick={openAddModal}
                            className="flex items-center gap-2 px-4 py-2 rounded text-white transition-all hover:shadow-lg bg-(--sidebar-bg) hover:bg-(--header-btn-bg-hover)"
                        >
                            <Plus className="w-4 h-4" />
                            Add Category
                        </button>
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <CategoryCard title='Total Category' stats={stats.total} textColor='text-gray-500' />
                    <CategoryCard title='Active' stats={stats.active} textColor='text-green-600' />
                    <CategoryCard title='Inactive' stats={stats.inactive} textColor='text-red-600' />
                    <CategoryCard title='Main Category' stats={stats.byLevel[0]} textColor='text-gray-500' />
                </div>

                <div className="mb-4">
                    <SearchFilter
                        filters={filters}
                        onFilterChange={setFilters}
                        showFilters={showFilters}
                        onToggleFilters={toggleFilters}
                        onResetFilters={resetFilters}
                        toggleExpandAll={toggleExpandAll}
                        allExpanded={allExpanded}
                    />
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-4 border-b" style={{ backgroundColor: '#26282a' }}>
                        <h2 className="text-lg font-semibold text-white">
                            Categories ({filteredCategories.length})
                        </h2>
                    </div>
                    <div>
                        {filteredCategories.length === 0 ? (
                            <div className="p-4 text-center text-gray-500">
                                <p>No categories found matching your filters.</p>
                            </div>
                        ) : (
                            buildCategoryTree().map((category) => renderCategoryRow(category))
                        )}
                    </div>
                </div>

                <CategoryModal
                    isOpen={isModalOpen}
                    editingCategory={editingCategory}
                    register={register}
                    errors={errors}
                    isSubmitting={isSubmitting}
                    categories={categories}
                    onClose={closeModal}
                    onSubmit={handleSubmit(onSubmit)}
                />
            </div>
        </div>
    );
}