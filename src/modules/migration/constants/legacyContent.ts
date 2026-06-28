// Constants
import {
	contEducation,
	education,
	employers,
	genInfo,
	projects,
} from '@/assets/data/data'

// Types
import type {
	LegacyEducationRecord,
	LegacyEmploymentRecord,
	LegacyGeneralInfo,
	LegacyProject,
} from '../types/legacyContent'

export const legacyGeneralInfo = genInfo[0] as unknown as LegacyGeneralInfo
export const legacyEducation = education as unknown as readonly LegacyEducationRecord[]
export const legacyContinuingEducation = contEducation as unknown as readonly LegacyEducationRecord[]
export const legacyEmployers = employers as unknown as readonly LegacyEmploymentRecord[]
export const legacyProjects = projects as unknown as readonly LegacyProject[]
