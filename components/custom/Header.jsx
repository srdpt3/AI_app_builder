import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-black text-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.jpeg"
                alt="Bolt Logo"
                width={40}
                height={40}
                priority
                className="rounded-full object-cover"
              />
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="/products" className="text-sm hover:text-gray-300">
              Products
            </Link>
            <Link href="/solutions" className="text-sm hover:text-gray-300">
              Solutions
            </Link>
            <Link href="/resources" className="text-sm hover:text-gray-300">
              Resources
            </Link>
            <Link href="/company" className="text-sm hover:text-gray-300">
              Company
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-sm hover:text-gray-300">
              Sign in
            </Link>
            <Link 
              href="/get-started" 
              className="bg-white text-black px-4 py-2 rounded-full text-sm hover:bg-gray-200"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;