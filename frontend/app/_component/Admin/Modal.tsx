import { X } from "lucide-react";
import { ReactNode } from "react";

export default function Modal({ title, closeModal, children }: { title: string, closeModal: () => void, children: ReactNode }) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-4 border-b rounded-t bg-(--modal-title-bg)">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">
                            {title}
                        </h3>
                        <button
                            onClick={closeModal}
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {children}
            </div>
        </div>
    )
}
