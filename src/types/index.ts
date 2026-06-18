export type Status = 'todo' | 'in_progress' | 'in_review' | 'done'
export type Priority = 'low' | 'normal' | 'high'

export interface Task {
    id: string
    title: string
    description: string | null
    status : Status
    priority: Priority
    due_date: string | null
    user_id: string
    created_at: string
}

export interface Column {
    id: Status
    title: string
}

export type NewTask = Pick<Task, 'title'| 'description' | 'priority' | 'due_date'>