import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast'; // Assuming useToast is shadcn
import { PlusCircle } from 'lucide-react';

const CreatePage: React.FC = () => {
  console.log('CreatePage loaded');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pageTitle, setPageTitle] = useState('');
  const [placeholderText, setPlaceholderText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Creating page with title:', pageTitle, 'and text:', placeholderText);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, you would save this data and get a page ID/URL
    const newPageId = Date.now().toString();
    const newPageViewUrl = `/view-page/${newPageId}`; // Example URL structure

    toast({
      title: "Page Created Successfully!",
      description: `Page "${pageTitle}" has been generated.`,
      action: (
        <Button variant="outline" size="sm" onClick={() => navigate(newPageViewUrl)}>
          View Page
        </Button>
      ),
    });
    
    // Save to a mock local storage for dashboard (simplified)
    const existingPages = JSON.parse(localStorage.getItem('userPages_mock') || '[]');
    const newPage = {
        id: newPageId,
        title: pageTitle,
        createdAt: new Date().toISOString(),
        status: 'published',
        viewUrl: newPageViewUrl,
        editUrl: `/edit-page/${newPageId}` // Placeholder
    };
    localStorage.setItem('userPages_mock', JSON.stringify([...existingPages, newPage]));


    setIsLoading(false);
    setPageTitle('');
    setPlaceholderText('');
    navigate('/dashboard'); // Or to the new page: navigate(newPageViewUrl);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-2xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <PlusCircle className="mr-2 h-6 w-6 text-primary" /> Create New Page
            </CardTitle>
            <CardDescription>
              Fill in the details below to generate your new empty page.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="pageTitle" className="text-base">Page Title</Label>
                <Input
                  id="pageTitle"
                  type="text"
                  placeholder="e.g., My Awesome Project"
                  value={pageTitle}
                  onChange={(e) => setPageTitle(e.target.value)}
                  required
                  className="text-base"
                />
                <p className="text-sm text-muted-foreground">This will be shown in the browser tab and as the page heading.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="placeholderText" className="text-base">Placeholder Text / Content</Label>
                <Textarea
                  id="placeholderText"
                  placeholder="e.g., Coming soon! This page is under construction."
                  value={placeholderText}
                  onChange={(e) => setPlaceholderText(e.target.value)}
                  rows={6}
                  className="text-base"
                />
                <p className="text-sm text-muted-foreground">The main content that will be displayed on your generated page.</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" size="lg" disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate Page'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default CreatePage;