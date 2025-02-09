'use client';

import { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-redirect effect
  useEffect(() => {
    if (!searchValue.trim()) return;

    const redirectTimer = setTimeout(() => {
      router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue('');
      setIsMenuOpen(false);
    }, 500); // Wait for 500ms of no typing before redirecting

    return () => clearTimeout(redirectTimer);
  }, [searchValue, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue('');
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-text-primary font-bold text-xl flex items-center"
          >
            <span className="text-primary">Recipe</span>
            Explorer
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSubmit}
            className="hidden md:flex items-center relative max-w-md flex-1 mx-8"
          >
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search recipes..."
              className="w-full px-4 py-2 pl-10 rounded-full bg-surface/50 border border-text-secondary/20 focus:outline-none focus:border-primary transition-colors"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4" />
          </form>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-text-primary p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md absolute top-16 left-0 right-0 border-t border-text-secondary/10">
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Search */}
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search recipes..."
                    className="w-full px-4 py-2 pl-10 rounded-full bg-surface/50 border border-text-secondary/20 focus:outline-none focus:border-primary"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4" />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}