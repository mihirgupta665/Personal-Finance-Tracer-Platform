import React from 'react';
import { FaGithub, FaGoogle, FaWhatsapp, FaTwitter, FaFacebook } from 'react-icons/fa';

export default function Footer() {
    const socialLinks = [
        { name: 'GitHub', href: 'https://github.com', icon: FaGithub },
        { name: 'Google', href: 'mailto:mihirgupta665@gmail.com', icon: FaGoogle },
        { name: 'WhatsApp', href: 'https://wa.me/7275521650', icon: FaWhatsapp },
        { name: 'Twitter', href: 'https://twitter.com', icon: FaTwitter },
        { name: 'Meta', href: 'https://www.facebook.com', icon: FaFacebook },
    ];

    return (
        <footer className="fixed bottom-0 left-0 right-0 w-full z-30 border-t border-stone-200 dark:border-stone-800 bg-[#fffcf5] dark:bg-stone-950/95 backdrop-blur-sm">
            <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="space-y-1 text-stone-700 dark:text-stone-200">
                        <h3 className="text-base font-bold text-gray-800 dark:text-white">Mihir Gupta</h3>
                        <p className="text-sm">Phone: <a className="hover:text-indigo-600 dark:hover:text-indigo-400" href="tel:7275521650">7275521650</a></p>
                        <p className="text-sm">
                            Contact me at{' '}
                            <a className="hover:text-indigo-600 dark:hover:text-indigo-400 break-all" href="mailto:mihirgupta665@gmail.com">
                                mihirgupta665@gmail.com
                            </a>
                        </p>
                    </div>

                    <div className="flex md:justify-end items-center gap-3 flex-wrap">
                        <p className="text-sm text-stone-500 dark:text-stone-400">All rights reserved 2026</p>
                        {socialLinks.map((item) => {
                            const Icon = item.icon;
                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={item.name}
                                    title={item.name}
                                    className="w-9 h-9 rounded-lg border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                >
                                    <Icon size={16} />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
}
