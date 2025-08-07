import React from 'react'
import { getServerSession } from 'next-auth'
import ProfilePage from '@/components/store/ProfilePage';

type User = {
  id: string;
  name: string;
  email: string;

  phone: string;
  image?: string;
  role: string;
};


async function page() {
  const session = await getServerSession();
  const user = session?.user as User;

  return (
    <div>
  <ProfilePage user={user} />    
    </div>
  )
}

export default page
