import { Link } from 'react-router-dom';
import { Youtube, Mail } from 'lucide-react';
import { XiaohongshuIcon } from '@/components/icons/Xiaohongshu';

const quickLinks = [
  { href: '/#about', label: '关于我' },
  { href: '/#videos', label: '视频' },
  { href: '/#topics', label: '主题场景' },
  { href: '/blog', label: '文章' },
  { href: '/#contact', label: '联系方式' },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-[#242424] text-white py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-semibold mb-4">三木有话说</h3>
            <p className="text-gray-400 leading-relaxed text-sm mb-4">
              以殡葬师的身份，讲述人生故事。直面死亡，才能活出真正的人生。
            </p>
            <a 
              href="mailto:info@sanmu.ca"
              className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              info@sanmu.ca
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-400">
              快速链接
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-400">
              关注我
            </h4>
            <div className="flex items-center gap-4">
              <a
                href="https://youtube.com/@yyds3mu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://xhslink.com/m/52fuADSL4hm"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="小红书"
              >
                <XiaohongshuIcon className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@sanmu.ca"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 三木有话说. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
