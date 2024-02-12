import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

const Navbar = async () => {
    const session = await getServerSession(options);
    return (
        <header>
            <nav className='flex justify-between items-center w-full px-10 py-4 bg-white'>
                <div>My Site</div>
                <div className='flex gap-10'>
                    <Link href="/">Home</Link>
                    <Link href="/user">User</Link>
                    <Link href="/createuser">Create User</Link>
                    <Link href="/about">About</Link>
                    <Link href="/careers">Careers</Link>
                    <Link href="/contact">Contact</Link>
                    {session ? (
                        <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
                    ) : (
                        <Link href="/api/auth/signin" >Login</Link>
                    )
                    }
                </div>
            </nav>
        </header>
    )
}

export default Navbar