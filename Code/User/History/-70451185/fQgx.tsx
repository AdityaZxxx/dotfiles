import { DashboardNav } from '@/components/ui/dashboard/DashboardNav';
import { ReactNode } from 'react';

export default DashboardLayout({ children }: { children:ReactNode }) {
    return (
        <div>
        <header>
        <DashboardNav /></header>
        </div>
    )
}