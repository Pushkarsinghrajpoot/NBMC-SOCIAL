'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppLayout } from '../components/AppLayout';

function PrivacyContent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <div className="text-sm text-muted-foreground space-y-1">
          <p><strong>PRIVACY POLICY NBMC Analytics — nbmcanalytics.com</strong></p>
          <p>Effective Date: March 12, 2026 | Last Updated: March 12, 2026</p>
        </div>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">1. Introduction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Welcome to NBMC Analytics ("we," "our," or "us"). NBMC Analytics is a social media analytics platform operated by NBMC, accessible at https://nbmcanalytics.com. This Privacy Policy explains how we collect, use, store, disclose, and protect your information when you use our platform.
            </p>
            <p>
              By accessing or using NBMC Analytics, you agree to the collection and use of your information in accordance with this Privacy Policy. If you do not agree with any part of this policy, please discontinue use of our platform immediately.
            </p>
            <p>
              This policy applies to all users of the platform, including individuals, businesses, agencies, and social media managers.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">2. Company Information & Contact Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              If you have any questions, concerns, or requests related to this Privacy Policy or our data practices, please contact us:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Company Name:</strong> NBMC Analytics</li>
              <li><strong>Website:</strong> nbmcanalytics.com</li>
              <li><strong>Privacy Contact Email:</strong> privacy@nbmcanalytics.com</li>
              <li><strong>General Support Email:</strong> support@nbmcanalytics.com</li>
            </ul>
            <p>We aim to respond to all privacy-related inquiries within 7 business days.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">3. Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">3.1 Account & Profile Information</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your name and email address provided during registration</li>
                <li>Profile photo (if provided via Facebook Login)</li>
                <li>Account preferences and dashboard settings</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">3.2 Facebook & Meta Platform Data</h3>
              <p className="mb-3">
                NBMC Analytics integrates with the Meta (Facebook) Graph API to provide analytics features. When you connect your Facebook account or use our platform to track public pages, we collect the following data from Meta's API:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Public Facebook Page names, IDs, categories, about sections, and profile images</li>
                <li>Public page follower counts and fan counts</li>
                <li>Publicly available posts from Facebook Pages including post text, images, creation time, and post type</li>
                <li>Public engagement metrics including likes, reactions, shares, and comment counts per post</li>
                <li>Public comments on Facebook Page posts including comment text, commenter public name, like counts, and timestamps</li>
                <li>Page follower growth data over time (historical snapshots)</li>
              </ul>
              <div className="mt-3 p-4 bg-blue-50 border-l-4 border-blue-500">
                <p className="font-semibold">IMPORTANT:</p>
                <p>We only access publicly available data from Facebook Pages. We do not access private profiles, private posts, private messages, or any data that is not publicly visible on Facebook. All Facebook data collected through Page Public Content Access is already publicly visible to anyone on the internet.</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">3.3 Usage & Technical Data</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>IP address and approximate geographic location</li>
                <li>Browser type, device type, and operating system</li>
                <li>Pages visited within our platform and time spent</li>
                <li>Features used and interactions with the dashboard</li>
                <li>Error logs and performance data</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">3.4 Data You Provide Directly</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Facebook Page IDs or names you choose to track</li>
                <li>Support requests or messages sent to us</li>
                <li>Feedback, ratings, or survey responses</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">4. How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">4.1 Core Platform Functionality</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To display analytics dashboards showing public Facebook Page performance metrics</li>
                <li>To fetch and cache public posts, comments, and engagement data from tracked Facebook Pages</li>
                <li>To generate follower growth charts, engagement rate calculations, and sentiment analysis</li>
                <li>To power the competitor comparison feature — showing multiple public pages side by side</li>
                <li>To classify comment sentiment as positive, neutral, or negative for analytical purposes</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">4.2 Account Management</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To create and manage your user account</li>
                <li>To authenticate your identity and secure your dashboard</li>
                <li>To save your list of tracked Facebook Pages and preferences</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">4.3 Platform Improvement</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To analyze usage patterns and improve platform features</li>
                <li>To fix bugs, resolve errors, and improve performance</li>
                <li>To develop new analytics features based on user needs</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">4.4 Communications</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To send transactional emails (account confirmation, password reset)</li>
                <li>To notify you of important changes to our platform or this Privacy Policy</li>
                <li>To respond to your support requests and inquiries</li>
              </ul>
            </div>

            <div className="p-4 bg-red-50 border-l-4 border-red-500">
              <p className="font-semibold">Important:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>We do NOT use your data for advertising</li>
                <li>We do NOT sell your personal data to any third party</li>
                <li>We do NOT use Facebook data for any purpose other than displaying analytics within your personal NBMC Analytics dashboard</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">5. Facebook & Meta Data — Specific Disclosures</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p>
              Because NBMC Analytics uses Meta's Platform APIs, we are required to make specific disclosures about how we handle Facebook data. This section applies specifically to data received via the Meta Graph API.
            </p>

            <div>
              <h3 className="text-xl font-semibold mb-3">5.1 Permissions We Request</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Page Public Content Access</strong> — allows us to read publicly available posts, comments, and metrics from any public Facebook Page, including pages you do not manage. This is required for competitor tracking and public page analytics features.</li>
                <li><strong>pages_read_engagement</strong> — allows us to read engagement statistics (likes, comments, shares) on public Facebook Page posts.</li>
                <li><strong>public_profile</strong> — basic profile information for account authentication via Facebook Login.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">5.2 What We Do With Facebook Data</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We cache public post and comment data in our Supabase database solely to display it in your analytics dashboard</li>
                <li>Cached Facebook data is associated with your account and not shared with other users</li>
                <li>We do not build advertising profiles, sell, license, or transfer Facebook data to any third party</li>
                <li>We do not use Facebook data to target users with advertisements</li>
                <li>We do not scrape, store, or distribute Facebook data outside of our platform's analytics functionality</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">5.3 Data Retention for Facebook Data</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Cached post and comment data is retained for up to 90 days from the date it was fetched</li>
                <li>Page follower growth snapshots are retained for up to 12 months to support historical trend charts</li>
                <li>When you remove a tracked page from your dashboard, all associated cached data is permanently deleted within 30 days</li>
                <li>When you delete your account, all Facebook data we have stored for you is permanently deleted within 30 days</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">5.4 Compliance with Meta Platform Policy</h3>
              <p>
                NBMC Analytics complies with Meta's Platform Terms and Developer Policies. We only use the permissions we have been granted by Meta for their stated purposes. We do not attempt to access data beyond what is permitted by our approved permissions.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">6. Data Sharing & Third Parties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We do not sell, rent, or trade your personal information. We only share your data in the following limited circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Supabase (Infrastructure):</strong> Supabase (supabase.com) — our database and authentication provider. Your account data and cached analytics data is stored securely in Supabase's infrastructure. Supabase is SOC 2 Type II compliant.</li>
              <li><strong>Meta / Facebook (OAuth):</strong> Meta Platforms, Inc. — when you connect your Facebook account, you interact with Meta's OAuth system. Meta's own Privacy Policy governs that interaction.</li>
              <li><strong>Vercel (Hosting):</strong> Vercel (vercel.com) — our hosting and deployment infrastructure provider.</li>
              <li><strong>Legal Compliance:</strong> If required by law, court order, or government authority, we may disclose data as legally compelled.</li>
              <li><strong>Business Transfer:</strong> In the event of a merger or acquisition, user data may be transferred. We will notify users in advance.</li>
            </ul>
            <p>
              All third-party service providers we use are contractually obligated to protect your data and may only use it to provide services to us.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">7. Data Retention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We retain your data only as long as necessary for the purposes outlined in this policy:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Account data is retained for the lifetime of your account plus 30 days after deletion</li>
              <li>Cached Facebook post/comment data: 90 days from fetch date</li>
              <li>Follower growth snapshots: 12 months</li>
              <li>Usage logs and analytics: 6 months</li>
              <li>Support correspondence: 2 years</li>
            </ul>
            <p>
              You may request deletion of your data at any time by emailing privacy@nbmcanalytics.com or deleting your account from the platform settings page.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">8. Your Rights & Choices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p>
              You have the following rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Right to Access:</strong> You may request a copy of all personal data we hold about you.</li>
              <li><strong>Right to Rectification:</strong> You may request correction of inaccurate or incomplete data.</li>
              <li><strong>Right to Deletion:</strong> You may request permanent deletion of your account and all associated data.</li>
              <li><strong>Right to Restriction:</strong> You may request that we restrict processing of your data in certain circumstances.</li>
              <li><strong>Right to Data Portability:</strong> You may request a machine-readable copy of your data for portability purposes.</li>
              <li><strong>Right to Disconnect Facebook:</strong> You may disconnect Facebook from our platform at any time via Settings. We will stop fetching new Facebook data immediately.</li>
            </ul>
            <p>
              To exercise any of these rights, email privacy@nbmcanalytics.com. We will respond within 30 days. We will not discriminate against you for exercising your privacy rights.
            </p>

            <div>
              <h3 className="text-xl font-semibold mb-3">8.1 Revoking Facebook Permissions</h3>
              <p>
                You can revoke NBMC Analytics' access to your Facebook account at any time by visiting your Facebook Settings → Apps and Websites → NBMC Analytics → Remove. Upon revocation, we will cease fetching new data. You may also delete your account within our platform to remove all stored data.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">9. Cookies & Tracking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              NBMC Analytics uses essential cookies required for the platform to function:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Authentication session cookies (to keep you logged in)</li>
              <li>Security cookies (CSRF protection)</li>
              <li>Preference cookies (to remember your dashboard settings)</li>
            </ul>
            <div className="p-4 bg-red-50 border-l-4 border-red-500">
              <p className="font-semibold">Important:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>We do NOT use advertising cookies, tracking pixels, or cross-site tracking technologies</li>
                <li>We do NOT use Google Analytics or similar third-party tracking services</li>
              </ul>
            </div>
            <p>
              You may disable cookies in your browser settings, but this will prevent you from logging into the platform.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">10. Data Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We take data security seriously and implement the following measures:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>All data is transmitted over HTTPS/TLS encryption</li>
              <li>Supabase database uses Row-Level Security (RLS) — you can only access your own data</li>
              <li>Passwords are never stored — we use secure OAuth authentication via Facebook Login or Supabase Auth</li>
              <li>Access tokens for Meta API are stored as environment variables, never in the database</li>
              <li>Regular security reviews of our codebase and infrastructure</li>
            </ul>
            <p>
              While we implement industry-standard security measures, no system is completely immune to breaches. In the event of a data breach affecting your personal information, we will notify you within 72 hours of becoming aware of the breach.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">11. Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              NBMC Analytics is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at privacy@nbmcanalytics.com and we will delete the information promptly.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">12. International Users & Data Transfers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              NBMC Analytics is operated from India. If you are accessing our platform from outside India, please be aware that your information may be transferred to, stored, and processed in servers located in India or where our service providers (Supabase, Vercel) operate. By using our platform, you consent to this transfer.
            </p>
            <p>
              For users in the European Economic Area (EEA), our legal basis for processing your personal data is: (a) your consent where explicitly given, (b) performance of our contract with you to provide the analytics service, and (c) our legitimate interests in operating and improving our platform.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">13. Changes to This Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices, services, or legal requirements. When we make significant changes, we will:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Update the 'Last Updated' date at the top of this policy</li>
              <li>Send an email notification to registered users for material changes</li>
              <li>Display a prominent notice on our platform for 30 days after significant changes</li>
            </ul>
            <p>
              Your continued use of NBMC Analytics after any changes to this Privacy Policy constitutes your acceptance of the updated policy.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">14. Meta Platform Compliance Statement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              NBMC Analytics uses the Meta Graph API under Meta's Platform Terms. We confirm the following:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>We only request permissions that are necessary for our platform's core functionality</li>
              <li>We do not use Facebook data for any purpose other than displaying analytics to the authenticated user who added the tracked page</li>
              <li>We do not transfer, sell, or commercialize Facebook user data or Facebook Page data</li>
              <li>We do not use Facebook data to create advertising audiences or profiles</li>
              <li>We comply with Meta's data deletion requirements when users disconnect their accounts</li>
              <li>We do not store sensitive Facebook user data beyond what is necessary for our analytics features</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">15. Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              For any privacy questions, data requests, complaints, or to exercise your rights under this policy, please contact:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Email:</strong> privacy@nbmcanalytics.com</li>
              <li><strong>Contact Form:</strong> https://nbmcanalytics.com/contact</li>
              <li><strong>Mailing Address:</strong> NBMC Analytics, India</li>
            </ul>
            <p>
              We take all privacy inquiries seriously and commit to responding within 7 business days.
            </p>
            <div className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground">
              <p>© 2026 NBMC Analytics. All rights reserved.</p>
              <p>nbmcanalytics.com | privacy@nbmcanalytics.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <AppLayout>
      <PrivacyContent />
    </AppLayout>
  );
}
