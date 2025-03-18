import { auth } from '@/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'

const Home = async () => {
  const session = await auth()

  console.log(session)

  if (!session) {
    redirect('/auth/login') // Redirect instead of returning null
  }

  return (
    <div className='dark:text-white'>
      <p>user: {session.user?.name}</p>
      <div className='relative w-12 h-12'>
        <Image
          src={
            session.user?.image ||
            `https://api.dicebear.com/9.x/bottts/png?seed=${encodeURIComponent(
              session.user?.name?.split(' ')[0] || 'default'
            )}%20${encodeURIComponent(
              session.user?.name?.split(' ')[1] || 'default'
            )}`
          }
          alt='avatar'
          className='rounded-full'
          width={50}
          height={50}
        />
      </div>
    </div>
  )
}
export default Home
