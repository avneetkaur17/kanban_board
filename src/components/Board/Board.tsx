import { useState } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { Column } from './Column';
import { TaskModal } from '../Task/TaskModal'
import type { Column as ColumnType } from '../../types';

const COLUMNS: ColumnType[] = [
    { id: 'todo',       title: 'TO DO' },
    { id: 'in_progress',title: 'In Progress' },
    { id: 'in_review',  title: 'In Review' },
    { id: 'done',       title: 'Done' },
]

interface Props {
    userId: string
}

export function Board({ userId }: Props) {
    const { tasks, loading, error, createTask, deleteTask } = useTasks(userId)
    const [showModal, setShowModal] = useState(false)

    if(loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-slate-400 text-sm">Loading your board...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-red-400 text-sm">Something went wrong: {error}</p>
            </div>
        )
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex items-center justify-between mb-8 pb-5
                            border-b border-slate-100">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-800">My Board</h1>
                    <p className="text-sm text-slate-400 mt-1">
                        {tasks.length} tasks . {tasks.filter(t => t.status === 'done').length} completed
                    </p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="border border-[#5B5BD6] text-[#5B5BD6] hover:bg-indigo-50
                                        text-sm font-medium px-4 py-2 rounded-xl transition-colors">
                    + New Task
                </button>
            </div>

            {/* Columns */}
            <div className="flex gap-4 overflow-x-auto pb-4">
                {COLUMNS.map(column => (
                    <Column
                        key={column.id}
                        column={column}
                        tasks={tasks.filter(t => t.status === column.id)}
                        onDeleteTask={deleteTask}
                        onAddTask={() => setShowModal(true)}
                    />
                ))}
            </div>

            {/* Modals */}
            {showModal && (
                <TaskModal
                    onClose={() => setShowModal(false)}
                    onCreate={createTask}
                />
            )}
        </div>
    )
}