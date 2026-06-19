import { useState } from "react";
import type { NewTask, Priority } from "../../types";

interface Props {
    onClose: () => void
    onCreate: (task: NewTask) => void
}

export function TaskModal({ onClose, onCreate }: Props) {
    const [title, setTitle] = useState(' ')
    const [description, setDescription] = useState(' ')
    const [priority, setPriority] = useState<Priority>('normal')
    const [dueDate, setDueDate] = useState(' ')

    function handleSubmit() {
        if (!title.trim()) return
        onCreate({
            title: title.trim(),
            description: description.trim() || null,
            priority,
            due_date: dueDate || null,
        })
        onClose()
    }

    // Close modal when clicking the dark background behind it
    function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
        if (e.target === e.currentTarget) onClose()
    }

    return (
        <div
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-semibold text-slate-800">New Task</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-300 hover:text-slate-500 transition-colors text-xl">
                        x
                    </button>
                </div>

                {/* Title */}
                <div className="mb-4">
                    <label className="text-xs font-medium text-slate-500 block mb-1.5">
                        Title <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                        placeholder="What needs to be done?"
                        autoFocus
                        className="w-fulltext-sm text-slate-800 border border-slate-200
                                    rounded-xl px-3 py-2.5 outline-none focus:border-indigo-400
                                    focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-300
                                    transition-all"
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="text-xs font-medium text-slate-500 block mb-1.5">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Optional details..."
                        rows={3}
                        className="w-fulltext-sm text-slate-800 border border-slate-200
                                    rounded-xl px-3 py-2.5 outline-none focus:border-indigo-400
                                    focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-300
                                    transition-all"
                    />
                </div>

                {/* Priority + Due date side by side */}
                <div className="flex gap-3 mb-6">
                    <div className="flex-1">
                        <label className="text-xs font-medium text-slate-500 block mb-1.5">
                            Priority
                        </label>
                        <select
                        value={priority}
                        onChange={e => setPriority(e.target.value as Priority)}
                        className="w-full text-sm text-slate-800 border border-slate-200
                                    rounded-xl px-3 py-2.5 outline-none focus:border-indigo-400
                                    focus:ring-2 focus:ring-indigo-100 transition-all">
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                        </select>
                    </div>

                    <div className="flex-1">
                        <label className="text-xs font-medium text-slate-500 block mb-1.5">
                            Due Date
                        </label>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={e => setDueDate(e.target.value)}
                            className="w-full text-sm text-slate-800 border border-slate-200
                                    rounded-xl px-3 py-2.5 outline-none focus:border-indigo-400
                                    focus:ring-2 focus:ring-indigo-100 transition-all"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="text-sm text-slate-500 border vorder-slate-200
                                    px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!title.trim()}
                        className="text-sm text-white bg-[#5B5BD6] px-4 py-2 rounded-xl
                                    hover:bg-indigo-700 transition-colors
                                    disabled:opacity-40 disabled:cursor-not-allowed">
                        Create task
                    </button>
                </div>
            </div>
        </div>
    )
}