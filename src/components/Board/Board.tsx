import { useState } from 'react';
import { DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useTasks } from '../../hooks/useTasks';
import { Column } from './Column';
import { TaskModal } from '../Task/TaskModal'
import type { Column as ColumnType, Status, Task } from '../../types';

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
    const { tasks, loading, error, createTask, updateTask, updateTaskStatus, deleteTask } = useTasks(userId)
    const [showModal, setShowModal] = useState(false)
    const [editingTask, setEditingTask] = useState<Task |null>(null)
    const VALID_STATUSES: Status[] = ['todo', 'in_progress', 'in_review', 'done']

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        })
    )

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (!over) return

        const taskId = active.id as string
        const newStatus = over.id as Status

        if (!VALID_STATUSES.includes(newStatus)) return
        const task = tasks.find(t => t.id === taskId)
        if (!task || task.status === newStatus) return

        updateTaskStatus(taskId, newStatus)
    }

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
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
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
                        onEditTask={setEditingTask}
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

            {editingTask && (
                <TaskModal
                    onClose={() => setEditingTask(null)}
                    onUpdate={updateTask}
                    existingTask={editingTask}
                />
            )}
        </div>
        </DndContext>
    )
}