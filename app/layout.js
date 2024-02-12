import AuthProvider from '@/components/AuthProvider';
import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata = {
  title: 'App Name',
  description: 'App Description',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className='bg-gray-100'>
          <Navbar />
          <div className='m-2'>
            {children}
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
