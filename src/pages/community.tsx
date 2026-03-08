import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

export default function CommunityPage(): ReactNode {
  return (
    <Layout
      title="Community"
      description="A companion page styled with the same custom Docusaurus theme.">
      <main className="theme-community-page">
        <div className="container">
          <section className="theme-community-shell">
            <span className="theme-community-shell__eyebrow">Community</span>
            <h1>Build, share, and iterate with the same design system.</h1>
            <p>
              The theme uses the same token set for docs pages, supporting pages,
              and utility UI so color changes only need to happen once.
            </p>
            <div className="theme-community-shell__actions">
              <Link className="theme-button" to="/api-reference/use-callback">
                Open the reference
              </Link>
              <Link className="theme-button theme-button--secondary" to="/blog">
                Visit the blog
              </Link>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
