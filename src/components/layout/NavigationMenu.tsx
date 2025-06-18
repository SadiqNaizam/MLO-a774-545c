import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, LogIn, User, LogOut, LayoutDashboard, PlusCircle, HomeIcon } from 'lucide-react';
// import { useAuth } from '@/hooks/useAuth'; // Assuming an auth hook might exist

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, onClick, className }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`text-sm font-medium text-muted-foreground transition-colors hover:text-primary ${className}`}
  >
    {children}
  </Link>
);

const NavigationMenu: React.FC = () => {
  console.log("Rendering NavigationMenu");
  const navigate = useNavigate();
  // Placeholder for auth state - replace with actual auth context/hook
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const { isAuthenticated, user, logout } = useAuth(); // Example usage of an auth hook

  // Simulate auth check
  useEffect(() => {
    // In a real app, check local storage, token, etc.
    const MOCK_AUTH_TOKEN = localStorage.getItem('MOCK_AUTH_TOKEN');
    if (MOCK_AUTH_TOKEN) {
        setIsAuthenticated(true);
    }
    console.log("NavigationMenu: Auth state checked, isAuthenticated:", MOCK_AUTH_TOKEN ? true : false);
  }, []);


  const handleLogout = () => {
    console.log("NavigationMenu: Logout action initiated");
    // logout(); // Call actual logout function from auth hook
    localStorage.removeItem('MOCK_AUTH_TOKEN'); // Mock logout
    setIsAuthenticated(false);
    navigate('/'); // Redirect to homepage after logout
  };

  const handleLogin = () => {
    console.log("NavigationMenu: Login action initiated");
    // For mock purposes, let's simulate login
    // In a real app, this would be handled by the AuthPage
    // localStorage.setItem('MOCK_AUTH_TOKEN', 'dummy_token');
    // setIsAuthenticated(true);
    navigate('/auth');
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const commonLinks = (isMobile = false) => (
    <>
      <NavLink to="/" onClick={() => isMobile && setIsMobileMenuOpen(false)} className={isMobile ? "py-2 flex items-center gap-2" : ""}>
        {isMobile && <HomeIcon className="h-4 w-4" />}Home
      </NavLink>
      {isAuthenticated && (
        <>
          <NavLink to="/dashboard" onClick={() => isMobile && setIsMobileMenuOpen(false)} className={isMobile ? "py-2 flex items-center gap-2" : ""}>
           {isMobile && <LayoutDashboard className="h-4 w-4" />}Dashboard
          </NavLink>
          <NavLink to="/create" onClick={() => isMobile && setIsMobileMenuOpen(false)} className={isMobile ? "py-2 flex items-center gap-2" : ""}>
            {isMobile && <PlusCircle className="h-4 w-4" />}Create Page
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          {/* Replace with your actual logo/brand name */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="font-bold">MyApp</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden flex-1 items-center space-x-4 md:flex">
          {commonLinks()}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2 md:flex-1">
          {isAuthenticated ? (
            <>
              {/* <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
                <User className="h-5 w-5" />
                <span className="sr-only">User Profile</span>
              </Button> */}
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <Button onClick={handleLogin}>
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Button>
          )}

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                <nav className="flex flex-col space-y-4 pt-6">
                  {commonLinks(true)}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
export default NavigationMenu;