import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import GeneratedPagePreviewCard from '@/components/GeneratedPagePreviewCard';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { PlusCircle, ListChecks, LayoutGrid } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface PageItem {
  id: string;
  title: string;
  createdAt: string;
  status?: 'draft' | 'published' | 'archived';
  viewUrl: string;
  editUrl: string;
}

const UserDashboardPage: React.FC = () => {
  console.log('UserDashboardPage loaded');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pages, setPages] = useState<PageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card'); // 'card' or 'table'

  // Pagination state (example)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


  useEffect(() => {
    // Simulate fetching user's pages
    setIsLoading(true);
    setTimeout(() => {
      const mockPagesFromStorage = JSON.parse(localStorage.getItem('userPages_mock') || '[]');
      
      // Use mock data if localStorage is empty (for initial view)
      const mockData: PageItem[] = mockPagesFromStorage.length > 0 ? mockPagesFromStorage : [
        { id: '1', title: 'My First Landing Page', createdAt: '2023-10-01T10:00:00Z', status: 'published', viewUrl: '/view-page/1', editUrl: '/edit-page/1' },
        { id: '2', title: 'Product Hunt Launch Idea', createdAt: '2023-10-15T14:30:00Z', status: 'draft', viewUrl: '/view-page/2', editUrl: '/edit-page/2' },
        { id: '3', title: 'Temporary Event Info', createdAt: '2023-11-01T09:15:00Z', status: 'archived', viewUrl: '/view-page/3', editUrl: '/edit-page/3' },
      ];
      setPages(mockData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleDeletePage = (idToDelete: string) => {
    console.log('Attempting to delete page with id:', idToDelete);
    // Add a confirmation dialog here in a real app
    setPages(prevPages => prevPages.filter(page => page.id !== idToDelete));
    
    const updatedMockPages = pages.filter(page => page.id !== idToDelete);
    localStorage.setItem('userPages_mock', JSON.stringify(updatedMockPages));

    toast({
      title: "Page Deleted",
      description: `The page has been successfully deleted.`,
      variant: "destructive"
    });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(pages.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
        <NavigationMenu />
        <main className="flex-grow container mx-auto px-4 py-12 text-center">
          <p className="text-lg">Loading your dashboard...</p>
          {/* Could add a Skeleton loader here */}
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">My Pages</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setViewMode('card')} disabled={viewMode === 'card'}>
              <LayoutGrid className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setViewMode('table')} disabled={viewMode === 'table'}>
              <ListChecks className="h-5 w-5" />
            </Button>
            <Button onClick={() => navigate('/create')} className="bg-primary hover:bg-primary/90">
              <PlusCircle className="mr-2 h-5 w-5" /> Create New Page
            </Button>
          </div>
        </div>

        {pages.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No pages yet!</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 mb-4">Click "Create New Page" to get started.</p>
            <img src="https://cdn-icons-png.flaticon.com/512/7466/7466073.png" alt="Empty state illustration" className="mx-auto h-40 w-40 opacity-70" />

          </div>
        ) : (
          <>
            {viewMode === 'card' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItems.map(page => (
                  <GeneratedPagePreviewCard
                    key={page.id}
                    id={page.id}
                    title={page.title}
                    createdAt={page.createdAt}
                    status={page.status}
                    viewUrl={page.viewUrl}
                    editUrl={page.editUrl}
                    onDelete={() => handleDeletePage(page.id)}
                  />
                ))}
              </div>
            ) : (
              <Table>
                <TableCaption>A list of your generated pages.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map(page => (
                    <TableRow key={page.id}>
                      <TableCell className="font-medium">{page.title}</TableCell>
                      <TableCell>{page.status?.charAt(0).toUpperCase() + page.status?.slice(1) || 'N/A'}</TableCell>
                      <TableCell>{new Date(page.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" onClick={() => navigate(page.viewUrl)}>View</Button>
                        <Button variant="outline" size="sm" onClick={() => navigate(page.editUrl)}>Edit</Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeletePage(page.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            {pages.length > itemsPerPage && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); if (currentPage > 1) paginate(currentPage - 1); }} />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink href="#" isActive={currentPage === i + 1} onClick={(e) => { e.preventDefault(); paginate(i + 1); }}>
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {/* Add Ellipsis logic if many pages */}
                  <PaginationItem>
                    <PaginationNext href="#" onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) paginate(currentPage + 1); }} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboardPage;