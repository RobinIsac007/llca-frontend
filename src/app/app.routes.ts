import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { EventsComponent } from './pages/events/events';
import { MinistriesComponent } from './pages/ministries/ministries';
import { AdmissionsComponent } from './pages/admissions/admissions';
import { MediaComponent } from './pages/media/media';
import { ContactComponent } from './pages/contact/contact';
import { AboutComponent } from './pages/about/about';
import { DashboardComponent } from './pages/admin/dashboard/dashboard';
import { ManageEventsComponent } from './pages/admin/manage-events/manage-events';
import { ManageAdmissionsComponent } from './pages/admin/manage-admissions/manage-admissions';
import { ManagePastorsComponent } from './pages/admin/manage-pastors/manage-pastors';
import { ManageMinistriesComponent } from './pages/admin/manage-ministries/manage-ministries.component';
import { LoginComponent } from './pages/admin/login/login';
import { authGuard } from './guards/auth.guard';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

export const routes: Routes = [
    // Public Routes (Wrapped in Public Layout)
    {
        path: '',
        component: PublicLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'events', component: EventsComponent },
            { path: 'ministries', component: MinistriesComponent },
            { path: 'admissions', component: AdmissionsComponent },
            { path: 'media', component: MediaComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'about', component: AboutComponent },
            { path: 'admin/login', component: LoginComponent },
        ]
    },

    // Admin Routes (Wrapped in Admin Layout & Protected)
    {
        path: 'admin',
        component: AdminLayoutComponent,
        canActivate: [authGuard], // Protects ALL child routes
        children: [
            { path: '', component: DashboardComponent },
            { path: 'events', component: ManageEventsComponent },
            { path: 'admissions', component: ManageAdmissionsComponent },
            { path: 'pastors', component: ManagePastorsComponent },
            { path: 'ministries', component: ManageMinistriesComponent },
        ]
    }
];
