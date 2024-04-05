// First, ensure to import the AuthProvider from the file you'll create it in
import '@/styles/bootstrap.min.css';
import { SWRConfig } from 'swr';
import Layout from '@/components/Layout';
import { AuthProvider } from '../contexts/AuthContext'; // Update the import path as needed

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider> {/* Wrap the Layout component with AuthProvider */}
      <Layout>
        <SWRConfig value={{
          fetcher: async url => {
            const res = await fetch(url);

            if (!res.ok) {
              const error = new Error('An error occurred while fetching the data.');
              error.info = await res.json();
              error.status = res.status;
              throw error;
            }
            return res.json();
          }
        }}>
          <Component {...pageProps} />
        </SWRConfig>
      </Layout>
    </AuthProvider>
  );
}
