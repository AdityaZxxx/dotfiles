import { authOptions } from 'app/api/user/login/[...nextauth]';
import { getServerSession } from 'next-auth';

export async function getSession() {
	return await getServerSession(authOptions);
}
