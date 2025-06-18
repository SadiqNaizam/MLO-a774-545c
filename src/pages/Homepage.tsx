import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Homepage: React.FC = () => {
  console.log('Homepage loaded');
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('MOCK_AUTH_TOKEN');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-sky-950">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <section className="w-full max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-50 mb-6">
            Welcome to the Empty Page Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
            Effortlessly create, manage, and share simple placeholder pages. Perfect for mockups, temporary links, or content placeholders.
          </p>
          
          {isAuthenticated ? (
            <Button size="lg" onClick={() => navigate('/dashboard')} className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
              Go to Your Dashboard <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <Button size="lg" onClick={() => navigate('/auth')} className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-left bg-white dark:bg-slate-800 shadow-lg">
              <CardHeader>
                <CardTitle>Quick Creation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Generate new pages in seconds with a simple title and placeholder text.</CardDescription>
              </CardContent>
            </Card>
            <Card className="text-left bg-white dark:bg-slate-800 shadow-lg">
              <CardHeader>
                <CardTitle>Easy Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>View, edit, and organize all your created pages from your personal dashboard.</CardDescription>
              </CardContent>
            </Card>
            <Card className="text-left bg-white dark:bg-slate-800 shadow-lg">
              <CardHeader>
                <CardTitle>Shareable Links</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Instantly get shareable URLs for your generated pages to use anywhere.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;