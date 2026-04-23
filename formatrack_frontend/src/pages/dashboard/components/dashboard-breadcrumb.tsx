import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

const DashboardBreadcrumb: React.FC = () => {
  const location = useLocation();

  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      { title: 'Accueil', link: '/', isActive: false }
    ];

    if (pathSegments.length === 0 || pathSegments[0] === 'dashboard') {
      breadcrumbs.push({ title: 'Dashboard', link: '/dashboard', isActive: true });

      if (pathSegments.length > 1) {
        switch (pathSegments[1]) {
          case 'global':
            breadcrumbs[breadcrumbs.length - 1].isActive = false;
            breadcrumbs.push({ title: 'Statistiques Globales', link: '/dashboard/global', isActive: true });
            break;
          case 'ecole':
            breadcrumbs[breadcrumbs.length - 1].isActive = false;
            breadcrumbs.push({ title: 'Statistiques École', link: location.pathname, isActive: true });
            break;
          case 'my-ecole':
            breadcrumbs[breadcrumbs.length - 1].isActive = false;
            breadcrumbs.push({ title: 'Mon École', link: '/dashboard/my-ecole', isActive: true });
            break;
        }
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {breadcrumb.isActive ? (
                <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={breadcrumb.link || '#'}>
                    {breadcrumb.title}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DashboardBreadcrumb;