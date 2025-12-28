'use client';

import { usePathname } from 'next/navigation';
import MainNavbar from '@/components/layout/MainNavbar';
import MainFooter from '@/components/layout/MainFooter';

const HIDE_LAYOUT_ROUTES = ['/dashboard', '/login', '/register'];

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const shouldHideLayout = HIDE_LAYOUT_ROUTES.some(route =>
        pathname.startsWith(route)
    );

    if (shouldHideLayout) {
        return <>{children}</>;
    }

    return (
        <>
            <MainNavbar />
            <main className="min-h-screen">
                {children}
            </main>
            <MainFooter />
        </>
    );
}
