import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Added CardHeader, CardTitle

interface PageData {
  title: string;
  content: string;
}

const ViewPage: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  console.log('ViewPage loaded for pageId:', pageId);
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    // In a real app, you would fetch pageData based on pageId
    // For now, simulate fetching or use mock data from localStorage if 'CreatePage' saved it there
    if (pageId) {
        const storedPages = JSON.parse(localStorage.getItem('userPages_mock') || '[]');
        const foundPage = storedPages.find((p: any) => p.id === pageId);
        if (foundPage) {
            setPageData({ title: foundPage.title, content: `This is the content for "${foundPage.title}". Placeholder text: ${foundPage.placeholderText || "No specific content was set for this page. This is a generic placeholder."}` });
            document.title = foundPage.title;
        } else {
            // Fallback if pageId is provided but not found in mock store
             setPageData({
                title: `Page ${pageId}`,
                content: `Content for page ${pageId} would be displayed here. This page might be dynamically generated or fetched from a database.`,
            });
            document.title = `Page ${pageId}`;
        }
    } else {
        // Default content if no pageId is in the URL (e.g. direct navigation to /view-page)
        setPageData({
            title: "Sample Generated Page",
            content: "This is the placeholder text for the generated page. It's clean, minimal, and focuses on the content you provide.",
        });
        document.title = "Sample Generated Page";
    }
  }, [pageId]);


  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
        <NavigationMenu />
        <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
          <Card className="w-full max-w-2xl text-center">
            <CardHeader>
              <CardTitle className="text-red-500">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{error}</p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
        <NavigationMenu />
        <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
           <p>Loading page content...</p>
        </main>
        <Footer />
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* For a truly 'empty' page feel when accessed via direct URL, NavigationMenu and Footer could be conditional */}
      {/* For now, they are included for consistent app context browsing */}
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-12">
        <Card className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100">
              {pageData.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert prose-lg max-w-none py-8 px-6 md:px-10">
            {/* The 'prose' classes from @tailwindcss/typography can nicely style HTML content */}
            {/* For simple text: */}
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{pageData.content}</p>
            {/* If content could be HTML, you might use dangerouslySetInnerHTML (with caution) or a markdown renderer */}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ViewPage;