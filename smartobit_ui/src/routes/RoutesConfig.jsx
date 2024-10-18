// Project Smart Obit for Malayala Manorama Co LTD
// Developed By Donis Abraham | Billan Jacob John | Afueth Thomas
// Start Date : 2024-10-07

import {lazy} from 'react';
import ProtectedRoute from './ProtectedRoutes.jsx';

// eslint-disable-next-line react-refresh/only-export-components
const LoginPage = lazy(() => import('../pages/Login/LoginPage.jsx'));

// const LoginPage = lazy(() =>
//     new Promise(resolve => {
//         setTimeout(() => {
//             resolve(import('../pages/Login/LoginPage.jsx'));
//         }, 1000); // 2-second delay
//     })
// );
// eslint-disable-next-line react-refresh/only-export-components
const Home = lazy(() => import('../pages/Home/Home.jsx'));
// eslint-disable-next-line react-refresh/only-export-components
const UserIndex = lazy(() => import('@/pages/ManageUsers/index.jsx'));
// eslint-disable-next-line react-refresh/only-export-components
const UnitsIndex = lazy(() => import('@/pages/ManageUnits/Index.jsx'));
// eslint-disable-next-line react-refresh/only-export-components
const ManageBureausIndex = lazy(() => import('@/pages/ManageBureaus/Index.jsx'));
// eslint-disable-next-line react-refresh/only-export-components
const RolesIndex = lazy(() => import('@/pages/Roles_Permissions/Index.jsx'));
// eslint-disable-next-line react-refresh/only-export-components
const AppsettingsIndex = lazy(() => import('@/pages/AppSettings/index.jsx'));
// eslint-disable-next-line react-refresh/only-export-components
const PagesettingsIndex = lazy(() => import('@/pages/PageSettings/Index.jsx'));
// eslint-disable-next-line react-refresh/only-export-components
const NewstoryIndex = lazy(() => import('@/pages/NewStory/Index.jsx'));
// eslint-disable-next-line react-refresh/only-export-components
const RecentstoriesIndex = lazy(() => import('@/pages/RecentStories/Index.jsx'));
// eslint-disable-next-line react-refresh/only-export-components
const AllstoriesIndex = lazy(() => import('@/pages/AllStories/Index.jsx'));
// eslint-disable-next-line react-refresh/only-export-components
const ArchivedstoriesIndex = lazy(() => import('@/pages/ArchivedStories/Index.jsx'));
// eslint-disable-next-line react-refresh/only-export-components
const AnniversarystoriesIndex = lazy(() => import('@/pages/AnniversaryStories/Index.jsx'));
// eslint-disable-next-line react-refresh/only-export-components
const HousekeepingIndex = lazy(() => import('@/pages/HouseKeeping/Index.jsx'));
// eslint-disable-next-line react-refresh/only-export-components
const PageBuilderIndex = lazy(() => import('@/pages/PageBuilder/Index.jsx'));
// eslint-disable-next-line react-refresh/only-export-components
const LazyLoader = lazy(()=> import('@/utils/LazyLoader.jsx'));

export const routesConfig = [
    {
        path: '/',
        element: <LoginPage/>,  // Public route
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>  {/* Protected route */}
                <Home/>
            </ProtectedRoute>
        ),
    },
    {
        path: '/dashboard/manage-user',
        element: (
            <ProtectedRoute>  {/* Protected route */}
                <UserIndex/>
            </ProtectedRoute>
        ),
    },
    {
        path: '/dashboard/manage-units',
        element: (
            <ProtectedRoute>  {/* Protected route */}
                <UnitsIndex/>
            </ProtectedRoute>
        ),
    },
    {
        path: '/dashboard/manage-bureaus',
        element: (
            <ProtectedRoute>  {/* Protected route */}
                <ManageBureausIndex/>
            </ProtectedRoute>
        ),
    },
    {
        path: '/dashboard/roles-permission',
        element: (
            <ProtectedRoute>  {/* Protected route */}
                <RolesIndex/>
            </ProtectedRoute>
        ),
    },
    {
        path: '/dashboard/app-settings',
        element: (
            <ProtectedRoute>  {/* Protected route */}
                <AppsettingsIndex/>
            </ProtectedRoute>
        ),
    },
    {
        path: '/dashboard/page-settings',
        element: (
            <ProtectedRoute>  {/* Protected route */}
                <PagesettingsIndex/>
            </ProtectedRoute>
        ),
    },
    {
        path: '/dashboard/new-story',
        element: (
            <ProtectedRoute>  {/* Protected route */}
                <NewstoryIndex/>
            </ProtectedRoute>
        ),
    },
    {
        path: '/dashboard/recent-stories',
        element: (
            <ProtectedRoute>  {/* Protected route */}
                <RecentstoriesIndex/>
            </ProtectedRoute>
        ),
    },
    {
        path: '/dashboard/all-stories',
        element: (
            <ProtectedRoute>  {/* Protected route */}
                <AllstoriesIndex/>
            </ProtectedRoute>
        ),
    },
    {
        path: '/dashboard/archived-stories',
        element: (
            <ProtectedRoute>  {/* Protected route */}
                <ArchivedstoriesIndex/>
            </ProtectedRoute>
        ),
    },
    {
        path: '/dashboard/anniversary-stories',
        element: (
            <ProtectedRoute>  {/* Protected route */}
                <AnniversarystoriesIndex/>
            </ProtectedRoute>
        ),
    },
    {
        path: '/dashboard/housekeeping',
        element: (
            <ProtectedRoute>  {/* Protected route */}
                <HousekeepingIndex/>
            </ProtectedRoute>
        ),
    },
    {
        path: '/dashboard/page-builder',
        element: (
            <ProtectedRoute>  {/* Protected route */}
                <PageBuilderIndex/>
            </ProtectedRoute>
        ),
    },
    {
        path: '/dashboard/loader',
        element: (
            <ProtectedRoute>  {/* Protected route */}
                <LazyLoader/>
            </ProtectedRoute>
        ),
    },
];
