import type { PrefectureDoc } from '$lib/server/postgres/models/Prefecture'
import { writable } from 'svelte/store'

export const prefsStore = writable<PrefectureDoc[]>([])
