import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import VideoPage from '@/pages/VideoPage';
import CategoriesPage from '@/pages/CategoriesPage';
import SearchPage from '@/pages/SearchPage';
import ProfilePage from '@/pages/ProfilePage';
import UploadPage from '@/pages/UploadPage';
import NotFoundPage from '@/pages/NotFoundPage';
import AggregatorManagementPage from '@/pages/AggregatorManagementPage';

import AboutPage from '@/pages/company/AboutPage';
import CareersPage from '@/pages/company/CareersPage';
import PressPage from '@/pages/company/PressPage';
import BlogPage from '@/pages/company/BlogPage';

import HelpPage from '@/pages/support/HelpPage';
import SafetyPage from '@/pages/support/SafetyPage';
import CommunityPage from '@/pages/support/CommunityPage';
import FeedbackPage from '@/pages/support/FeedbackPage';

import TermsPage from '@/pages/legal/TermsPage';
import PrivacyPage from '@/pages/legal/PrivacyPage';
import CopyrightPage from '@/pages/legal/CopyrightPage';
import CookiePolicyPage from '@/pages/legal/CookiePolicyPage';

import { AuthProvider } from '@/contexts/AuthContext';


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="video/:id" element={<VideoPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="manage-aggregated" element={<AggregatorManagementPage />} />
          
          <Route path="company/about" element={<AboutPage />} />
          <Route path="company/careers" element={<CareersPage />} />
          <Route path="company/press" element={<PressPage />} />
          <Route path="company/blog" element={<BlogPage />} />

          <Route path="support/help" element={<HelpPage />} />
          <Route path="support/safety" element={<SafetyPage />} />
          <Route path="support/community" element={<CommunityPage />} />
          <Route path="support/feedback" element={<FeedbackPage />} />

          <Route path="legal/terms" element={<TermsPage />} />
          <Route path="legal/privacy" element={<PrivacyPage />} />
          <Route path="legal/copyright" element={<CopyrightPage />} />
          <Route path="legal/cookies" element={<CookiePolicyPage />} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster />
    </AuthProvider>
  );
}

export default App;