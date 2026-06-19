import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'
import type { Task, Status, NewTask } from '../types'

export function useTasks(userId: string | undefined) {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // 1. FETCH
        useEffect( () => {
            if (!userId) return // don't fetch until we have a user

            async function fetchTasks() {
                const { data, error } = await supabase
                    .from('tasks')
                    .select('*')
                    .order('created_at', { ascending: true })

                if (error) {
                    setError(error.message)
                } else {
                    setTasks(data as Task[])
                }
                setLoading(false)
            }

            fetchTasks()
        }, [userId])        // re-runs if userID changes

        // 2. CREATE
        async function createTask(newTask: NewTask) {
            const { data, error } = await supabase
                .from('tasks')
                .insert({
                    ...newTask,
                    status: 'todo',     // all new tasks start in TO DO
                    user_id: userId,
                })
                .select()
                .single()

            if (error) {
                setError(error.message)
                return
            }

            setTasks(prev => [...prev, data as Task])
        }

        // 3. UPDATE STATUS
        async function updateTaskStatus(taskID: string, newStatus: Status) {
            // Optimistic update - move the card in the UI instantly
            // don't wait for Supabase to respond
            setTasks(prev =>
                prev.map(task =>
                    task.id === taskID ? { ...task, status: newStatus } : task
                )
            )

            // Then sync to Supabase in the background
            const { error } = await supabase
                .from('tasks')
                .update({ status: newStatus })
                .eq('id', taskID)

            // If it failed, roll back the optimistic update
            if (error) {
                setError(error.message)
                setTasks(prev => 
                    prev.map(task =>
                        task.id === taskID ? { ...task, status: newStatus } : task
                    )
                )
            }
        }
        
        //4. UPDATE TASK DETAILS
        async function updateTask(taskId: string, updates: Partial<NewTask>) {
            setTasks(prev =>
                prev.map(task =>
                    task.id === taskId ? { ...task, ...updates } : task
                )
            )

            const { error } = await supabase
                .from('tasks')
                .update(updates)
                .eq('id', taskId)

            if (error) {
                setError(error.message)
            }
        } 

        // 5. DELETE
        async function deleteTask(taskID: string) {
            // Optimistic update - remove from UI immediately
            setTasks(prev => prev.filter(task => task.id !== taskID))

            const { error } = await supabase
                .from('tasks')
                .delete()
                .eq('id', taskID)

                if (error) {
                    setError(error.message)
                }
        }

        return { tasks, loading, error, createTask, updateTask, updateTaskStatus, deleteTask}
}