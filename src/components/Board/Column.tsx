import { type Task, type Column as ColumnType } from '../../types'
import { TaskCard } from './TaskCard'

interface Props {
    column: ColumnType
    tasks: Task[]
    onDeleteTask: (id: string) => void
    onAddTask: () => void
}

const COLUMN_COLORS: Record<string, string> = {
    todo:       'bg-blue-50',
    in_progress:'bg-orange-50',
    in_review:  'bg-purple-50',
    done:       'bg-green-50',
}

const TITLE_COLORS: Record<string, string> = {
    todo:       'text-blue-700',
    in_progress:'text-orange-700',
    in_review:  'text-purple-700',
    done:       'text-green-700',
}

export function Column({ column, tasks, onDeleteTask, onAddTask }: Props) {
    return (
        <div className={`flex flex-col rounded-2xl p-3 min-w-65 w-67.5
                        ${COLUMN_COLORS[column.id]}`}>

            {/* Header */}  
            <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                    <h2 className={`text-sm font-semibold ${TITLE_COLORS[column.id]}`}>
                        {column.title}
                    </h2>
                    <span className="text-xs text-size-slate-400 font-medium">
                        {tasks.length}
                    </span>
                </div>

                {column.id === 'todo' && (
                    <button
                        onClick={onAddTask}
                        className="text-slate-400 hover:text-slate-600 hover:bg-white/60
                                    rounded-lg p-1 transition-colors text-lg leading-none">
                        +
                    </button>
                )}
            </div>

            {/*Cards */}
            <div className="flex flex-col gap-2 flex-1">
                {tasks.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center py-8">
                        <p className="text-xs text-slate-400"> No tasks here</p>
                    </div>
                ) : (
                    tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onDelete={onDeleteTask}
                        />
                    ))
                )}
            </div>
        </div>
    )
}