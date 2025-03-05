import { fetchPage } from '$lib/server/cms'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => await fetchPage('index')
