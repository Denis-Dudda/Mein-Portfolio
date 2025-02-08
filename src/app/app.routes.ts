import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
export const routes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'privacy', component: PrivacyPolicyComponent },
    { path: 'legal', component: LegalNoticeComponent },
];
