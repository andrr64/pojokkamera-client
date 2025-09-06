'use client';

import { useUserPersist } from '@/lib/hooks/userPersistState';
import { webRoute } from '@/route/web_route';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface AuthControllerProps {
    children: React.ReactNode;
}

const AuthController: React.FC<AuthControllerProps> = ({ children }) => {
    const userPersist = useUserPersist();
    const router = useRouter();
    const [mounted, setMounted] = useState(false); // <--- baru render setelah mounted

    useEffect(() => {
        setMounted(true);
        if (!userPersist.isEmpty()) {
            router.push(webRoute.home);
        }
    }, [userPersist, router]);

    if (!mounted) {
        return <div className='bg-gray-50 dark:bg-gray-800 min-h-screen'></div>; // tunggu redirect
    }

    if (!userPersist.isEmpty()) {
        return <div className='bg-gray-50 dark:bg-gray-800 min-h-screen'></div>; // tunggu redirect
    }

    return <>{children}</>;
};

export default AuthController;
