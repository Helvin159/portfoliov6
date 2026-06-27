// Actions
import { createFirebaseUploadTokenResponse } from '@/modules/firebase/actions/createUploadToken'

export const runtime = 'nodejs'

export async function POST(request: Request): Promise<Response> {
	return createFirebaseUploadTokenResponse(request)
}
