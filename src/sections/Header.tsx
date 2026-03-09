import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Youtube, Mail, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { XiaohongshuIcon } from '@/components/icons/Xiaohongshu';

const navLinks = [
  { href: '#about', label: '关于我' },
  { href: '#videos', label: '视频' },
  { href: '#topics', label: '主题场景' },
  { href: '/blog', label: '文章', isPage: true },
  { href: '#contact', label: '联系方式' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleNavClick = (href: string, isPage?: boolean) => {
    setIsOpen(false);
    
    if (isPage) {
      // For blog page, navigate directly
      navigate(href);
    } else {
      // For anchor links, always go to home page with hash
      navigate({ pathname: '/', hash: href });
    }
  };

  const isActive = (href: string, isPage?: boolean) => {
    if (isPage) {
      return location.pathname === href;
    }
    return location.pathname === '/' && location.hash === href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5">
        <div className="flex items-center justify-between h-[70px]">
          {/* Social Icons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://youtube.com/@yyds3mu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#242424] hover:text-[#818181] transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="https://xhslink.com/m/52fuADSL4hm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#242424] hover:text-[#818181] transition-colors"
              aria-label="小红书"
            >
              <XiaohongshuIcon className="w-5 h-5" />
            </a>
            <a
              href="mailto:info@sanmu.ca"
              className="text-[#242424] hover:text-[#818181] transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-xl font-semibold text-[#242424] tracking-wide">
              三木有话说
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 ml-auto mr-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href, link.isPage)}
                className={`text-[#242424] hover:text-[#818181] transition-colors link-underline text-sm bg-transparent border-none cursor-pointer ${
                  isActive(link.href, link.isPage) ? 'font-medium' : ''
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Search & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link
              to="/blog"
              className="text-[#242424] hover:text-[#818181] transition-colors"
              aria-label="搜索"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className="lg:hidden text-[#242424] hover:text-[#818181] transition-colors p-2"
                  aria-label="菜单"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-white p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="flex items-center justify-between p-6 border-b border-[#e0e0e0]">
                    <span className="text-lg font-semibold text-[#242424]">菜单</span>
                  </div>
                  
                  {/* Mobile Navigation Links */}
                  <nav className="flex-1 py-6 px-6">
                    <ul className="space-y-1">
                      {navLinks.map((link) => (
                        <li key={link.href}>
                          <button
                            onClick={() => handleNavClick(link.href, link.isPage)}
                            className={`w-full text-left py-3 px-4 text-base text-[#242424] hover:text-[#818181] hover:bg-[#f5f5f5] rounded-lg transition-colors bg-transparent border-none cursor-pointer ${
                              isActive(link.href, link.isPage) ? 'bg-[#f5f5f5] font-medium' : ''
                            }`}
                          >
                            {link.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  
                  {/* Mobile Menu Footer */}
                  <div className="p-6 border-t border-[#e0e0e0]">
                    <p className="text-sm text-[#818181] mb-4">关注我</p>
                    <div className="flex items-center gap-4">
                      <a
                        href="https://youtube.com/@yyds3mu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#242424] hover:bg-[#e0e0e0] transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <Youtube className="w-5 h-5" />
                      </a>
                      <a
                        href="https://xhslink.com/m/52fuADSL4hm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#242424] hover:bg-[#e0e0e0] transition-colors"
                        onClick={() => setIsOpen(false)}
                        aria-label="小红书"
                      >
                        <XiaohongshuIcon className="w-5 h-5" />
                      </a>
                      <a
                        href="mailto:info@sanmu.ca"
                        className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#242424] hover:bg-[#e0e0e0] transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
