import { useEffect, useState } from "react";
import {supabase} from "../lib/supabase"
import type { User } from '@supabase/supabase-js'

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        supabase.auth.getSession().then(({data: { session } }) => {
            if (session?.user) {
                setUser(session.user)
                setLoading(false)
            } else {
                supabase.auth.signInAnonymously().then(({ data }) => {
                    setUser(data.user)
                    setLoading(false)
                })
            }
        })
    }, [])

    return { user, loading }
}