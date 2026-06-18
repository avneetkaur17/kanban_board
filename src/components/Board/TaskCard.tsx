import { type Task } from '../../types'
import { format, isAfter, addDays, startOfDay } from 'date-fns'

interface Props {
    task: Task
    onDelete: (id: string) => void
}

const DOT_STYLES = {
    high:   'bg-red-400',
    normal: 'bg-blue-400',
    low:    'bg-slate-300',
}

export function TaskCard({ task, onDelete }: Props) {
    const today = startOfDay(new Date())
    const twoDaysFromNow = addDays(today, 2)

    const dueDate = task.due_date ? startOfDay(new Date(task.due_date)) : null
    const isOverdue = dueDate ? isAfter(today, dueDate) : false
    const isDueSoon = dueDate && !isOverdue ? !isAfter(dueDate, twoDaysFromNow) :false

    return (
        <div className="bg-white rounded-xl p-3 border-black/6
                        hover:border-black/12 transition-colors cursor-grab
                        active:cursor-grabbing group relative">

            {/* Title */}
            <p className="text-sm font-medium text-slate-800 leading-snug pr-5">
                {task.title}
            </p>

            {/* Description */}
            {task.description && (
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-snug">
                    {task.description}
                </p>
            )}
            {/* Footer */}
            <div className="flex items-center justify-between mt-3">

                {/* Priority dot + label */}
                <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${DOT_STYLES[task.priority]}`} />
                    <span className="text-xs text-slate-500 capitalize">{task.priority}</span>
                </div>

                {/* Due date */}
                {task.due_date && (
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full
                        ${isOverdue
                            ? 'bg-red-100 text-red-600'
                            : isDueSoon
                            ? 'bg-amber-100 text-amber-600'
                            : 'text-slate-400'
                        }`}>
                        {isOverdue ? '⚠️ Overdue' : format(new Date(task.due_date), 'MMM d')}
                    </span>
                )}
            </div>

            {/* Delete button */}
            <button
                onClick={() => onDelete(task.id)}
                className="absolute top-2.5 right-2.5 text-slate-300 hover:text-red-400
                            opacity-0 group-hover:opacity-100 transition-opacity text-xs" >
                x
            </button>
        </div>
    )
}