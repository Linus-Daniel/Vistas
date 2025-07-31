import Footer from './Footer';
import Header from './Header';
import { ReactNode } from 'react';

export default function Layout({ children }:{children:ReactNode}) {
  return (
    <div className="font-sans text-gray-800">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}