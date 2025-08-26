import React, { useState } from 'react';
import {
  ShoppingBag,
  Home,
  User,
  Plus,
  Menu,
  X,
  Package
} from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', icon: Home, href: '/' },
    { name: 'Buy', icon: ShoppingBag, href: '/products' },
    { name: 'Sell', icon: Plus, href: '/sell' },
    { name: 'My Products', icon: Package, href: '/myproducts' },
    { name: 'Profile', icon: User, href: '/profile' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo Section */}
            <div className="flex items-center">
              <div className="flex items-center gap-3">
                <a  href="/" className="bg-gradient-to-r from-blue-500 to-purple-600  rounded-xl shadow-lg">
                  <img src="/logo.jpg" className='w-14 h-14' alt="" />
                </a>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    HostleCart <span className='text-sm'>kanpur</span>
                  </h1>
                  <p className="text-xs text-gray-500">Apne hostel ka OLX</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={toggleMobileMenu}>
          <div className="fixed inset-y-0 right-0 w-72 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-800">Menu</h2>
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Navigation */}
              <div className="space-y-3">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    onClick={toggleMobileMenu}
                    className="flex items-center gap-4 p-4 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  >
                    <item.icon size={20} />
                    <span className="font-medium text-lg">{item.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default Header;
