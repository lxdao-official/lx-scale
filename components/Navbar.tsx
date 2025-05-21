'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";

export function Navbar() {
    const pathname = usePathname();

    return (
        <header className="border-b">
            <div className="container flex items-center justify-between h-14 px-4 max-w-6xl mx-auto">
                <div className="flex items-center">
                    <Link href="/" className="text-lg font-medium flex items-center gap-2">
                        <div className="w-8 h-8 border rounded flex items-center justify-center">
                            LX
                        </div>
                        <span>LXScale</span>
                    </Link>
                </div>
                <nav className="flex items-center gap-4 text-sm">
                    <Link
                        href="/"
                        className={`${pathname === '/' ? 'font-medium' : 'text-muted-foreground'} hover:text-foreground transition-colors`}
                    >
                        介绍
                    </Link>
                    <Link
                        href="/questionnaire"
                        className={`${pathname.startsWith('/questionnaire') ? 'font-medium' : 'text-muted-foreground'} hover:text-foreground transition-colors`}
                    >
                        问答列表
                    </Link>
                    <Link
                        href="https://github.com/lxdao-official/lx-scale"
                        target="_blank"
                        className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                    >
                        开源仓库
                        <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                </nav>
            </div>
        </header>
    );
}