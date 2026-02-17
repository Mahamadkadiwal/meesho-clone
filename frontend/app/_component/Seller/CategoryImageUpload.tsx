"use client";
import Image from 'next/image';
import { useState } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import Modal from '../Admin/Modal';
import { IoClose } from 'react-icons/io5';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { addImages, removeImage } from '@/app/store/slices/catalogSlice';



export default function CategoryImageUpload({ level1, level2, level3, level4 }) {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const images = useSelector((state: RootState) => state.catalog.images);

    const categoryPath = useSelector(
        (state: RootState) => state.catalog.categoryPath
    );

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        dispatch(addImages(files));
        setShowModal(true);
    };

    const removeProduct = (index) => {
        dispatch(removeImage(index));
    };

    function onClose() {
        setShowModal(!showModal);
    }

    return (
        <div className="bg-white w-65 shadow rounded overflow-y-auto">

            <div className="bg-gray-200 p-3">
                {categoryPath.map((c, i) => (
                    <span className="text-(--text-color) text-sm" key={i}>{c.name} / </span>
                ))}
            </div>

            <div className="p-4 flex justify-center">
                <form>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        id="productImages"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="productImages" className="catalog-btn cursor-pointer">
                        Add Product Images
                    </label>
                </form>
            </div>

            <div className="mx-4 mb-3 p-3 rounded-md bg-yellow-100 border border-yellow-300 text-yellow-800 text-xs flex items-center gap-2">
                <span><RiErrorWarningLine /></span>
                <span>Follow guidelines to reduce quality check failure</span>
            </div>

            <div className="p-4 text-xs space-y-2">
                <p className="font-semibold">General Guidelines</p>
                <ul className="list-decimal pl-5 space-y-1">
                    <li>You can add minimum 1 and maximum 9 products.</li>
                    <li>Upload products from the same category that you have chosen.</li>
                </ul>
            </div>

            {showModal && (
                <Modal title="Products in a catalog" closeModal={onClose}>

                    <p className="p-3 text-sm text-(--text-color)">
                        Please add only front image of your product. If you want to add multiple
                        images for particular product, you can add it in next step.
                    </p>
                    <div className="mx-4 mb-3 p-3 rounded-md bg-yellow-100 border border-yellow-300 text-yellow-800 text-xs flex items-center gap-2">
                        <RiErrorWarningLine />
                        <span>You can add minimum 1 and maximum 9 products to create a catalog</span>
                    </div>

                    <div className="grid grid-cols-4 gap-4 px-6 pb-4">

                        {images.map((img, i) => (
                            <div
                                key={i}
                                className="relative w-24 h-28 rounded-md bg-gray-50 flex items-center justify-center"
                            >

                                <button
                                    onClick={() => removeProduct(i)}
                                    className="absolute -top-2 -right-1 bg-gray-200 hover:bg-gray-300 
                                        rounded-full w-6 h-6 flex items-center justify-center shadow"
                                >
                                    <IoClose className="text-sm" />
                                </button>

                                <Image
                                    src={URL.createObjectURL(img)}
                                    alt="preview"
                                    width={80}
                                    height={96}
                                    unoptimized
                                    className="object-contain rounded"
                                />
                            </div>
                        ))}


                        {images.length < 9 && (
                            <label className="w-24 h-28 shadow-lg bg-gray-200 rounded-md flex flex-col items-center justify-center cursor-pointer text-blue-600 text-sm">

                                <span className="text-2xl">＋</span>
                                <span>Add Product</span>

                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    hidden
                                    onChange={handleFileChange}
                                />
                            </label>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 p-4">
                        <button className="catalog-normal-btn" onClick={onClose}>
                            Cancel
                        </button>
                        <Link href="/seller/catalog/single/add" className="catalog-btn">
                            Continue
                        </Link>
                    </div>

                </Modal>
            )}



        </div >
    )
}
