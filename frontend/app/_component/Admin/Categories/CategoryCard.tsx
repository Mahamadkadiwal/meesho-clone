import React from 'react'

export default function CategoryCard({ title, stats, textColor }: { title: string, stats: number, textColor: string }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className={`text-sm text-gray-500`}>{title}</div>
            <div className={`text-2xl font-bold ${textColor} mt-1`}>{stats}</div>
        </div >
    )
}
