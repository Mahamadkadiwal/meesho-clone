"use client";
import { Category } from '@/app/_types/admin/category.type';
import { useState } from 'react';
import CategoryColumn from './CategoryColumn';
import CategoryImageUpload from './CategoryImageUpload';
import { useDispatch } from 'react-redux';
import { setCategoryPath } from '@/app/store/slices/catalogSlice';

export type level = {
    id: string,
    name: string
}

export default function SelectCategory({ categories }: Category[]) {

    const dispatch = useDispatch();

    const updateCategoryRedux = (
        l1: level | null,
        l2: level | null,
        l3: level | null,
        l4: level | null
    ) => {
        const path = [l1, l2, l3, l4].filter(Boolean);
        dispatch(setCategoryPath(path as any));
    };

    const [level1, setLevel1] = useState<level | null>(null);
    const [level2, setLevel2] = useState<level | null>(null);
    const [level3, setLevel3] = useState<level | null>(null);
    const [level4, setLevel4] = useState<level | null>(null);

    const getChildren = (parentId: string | null) =>
        categories.filter((c) => c.parentId === parentId);

    return (
        <div className="flex gap-3 p-4 bg-gray-100">

            <CategoryColumn
                level={0}
                items={getChildren(null)}
                selected={level1?.id || null}
                onClick={(id, name) => {
                    const newLevel1 = { id, name };
                    setLevel1(newLevel1);
                    setLevel2(null);
                    setLevel3(null);
                    setLevel4(null);
                    updateCategoryRedux(newLevel1, null, null, null);
                }}
            />

            {level1 && (
                <CategoryColumn
                    level={1}
                    items={getChildren(level1.id)}
                    selected={level2?.id || null}
                    onClick={(id, name) => {
                        const newLevel2 = { id, name };
                        setLevel2(newLevel2);
                        setLevel3(null);
                        setLevel4(null);
                        updateCategoryRedux(level1, newLevel2, null, null);
                    }}
                />
            )}

            {level2 && (
                <CategoryColumn
                    level={2}
                    items={getChildren(level2.id)}
                    selected={level3?.id || null}
                    onClick={(id, name) => {
                        const newLevel3 = { id, name };
                        setLevel3(newLevel3);
                        setLevel4(null);
                        updateCategoryRedux(level1, level2, newLevel3, null);
                    }}
                />
            )}

            {level3 && (
                <CategoryColumn
                    level={3}
                    items={getChildren(level3.id)}
                    selected={level4?.id || null}
                    onClick={(id, name) => {
                        const newLevel4 = { id, name };
                        setLevel4(newLevel4);
                        updateCategoryRedux(level1, level2, level3, newLevel4);
                    }}
                />
            )}

            {level4 && (
                <CategoryImageUpload level1={level1} level2={level2} level3={level3} level4={level4} />
            )}

        </div>
    )
}
