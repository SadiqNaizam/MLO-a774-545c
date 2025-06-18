import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert'; // For error messages
import { LogIn, UserPlus } from 'lucide-react';


const AuthPage: React.FC = () => {
  console.log('AuthPage loaded');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Login State
  const [loginEmail, setLoginEmail] = useState('user@example.com'); // Default credentials
  const [loginPassword, setLoginPassword] = useState('password123'); // Default credentials
  const [loginError, setLoginError] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // Register State
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginLoading(true);
    setLoginError('');
    console.log('Login attempt with:', loginEmail);

    // Simulate API Call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (loginEmail === 'user@example.com' && loginPassword === 'password123') {
      localStorage.setItem('MOCK_AUTH_TOKEN', 'dummy_user_token_logged_in');
      toast({
        title: 'Login Successful!',
        description: 'Welcome back!',
      });
      // Force re-render of NavigationMenu or redirect which will re-check auth
      // A better way would be a global auth state
      navigate('/dashboard'); 
      window.location.reload(); // Simplest way to make NavigationMenu update based on token
    } else {
      setLoginError('Invalid email or password. Please try again.');
    }
    setIsLoginLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegisterLoading(true);
    setRegisterError('');
    console.log('Register attempt for:', registerEmail);

    if (registerPassword !== registerConfirmPassword) {
      setRegisterError('Passwords do not match.');
      setIsRegisterLoading(false);
      return;
    }
    if (registerPassword.length < 6) {
      setRegisterError('Password must be at least 6 characters long.');
      setIsRegisterLoading(false);
      return;
    }
    // Simulate API Call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful registration
    // In a real app, you'd create the user and then likely log them in or ask them to log in.
    // For this example, let's simulate login after registration.
    localStorage.setItem('MOCK_AUTH_TOKEN', 'dummy_new_user_token_registered');
    toast({
      title: 'Registration Successful!',
      description: 'Your account has been created. You are now logged in.',
    });
    navigate('/dashboard');
    window.location.reload(); // Simplest way to make NavigationMenu update based on token
    
    setIsRegisterLoading(false);
  };


  return (
    <div className="flex flex-col min-h-screen bg-slate-100 dark:bg-slate-950">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-2xl">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="py-3 text-base">
                <LogIn className="mr-2 h-5 w-5" /> Login
              </TabsTrigger>
              <TabsTrigger value="register" className="py-3 text-base">
                <UserPlus className="mr-2 h-5 w-5" /> Register
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Welcome Back!</CardTitle>
                <CardDescription>Sign in to access your dashboard and manage your pages.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-6">
                  {loginError && (
                    <Alert variant="destructive">
                      <AlertDescription>{loginError}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input id="login-email" type="email" placeholder="you@example.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input id="login-password" type="password" placeholder="••••••••" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoginLoading}>
                    {isLoginLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                  <div className="text-center text-sm">
                    <a href="#" className="font-medium text-primary hover:underline">Forgot password?</a>
                  </div>
                </form>
              </CardContent>
            </TabsContent>

            <TabsContent value="register">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Create an Account</CardTitle>
                <CardDescription>Join us and start creating your pages in minutes.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-6">
                  {registerError && (
                    <Alert variant="destructive">
                      <AlertDescription>{registerError}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input id="register-email" type="email" placeholder="you@example.com" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input id="register-password" type="password" placeholder="••••••••" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">Confirm Password</Label>
                    <Input id="register-confirm-password" type="password" placeholder="••••••••" value={registerConfirmPassword} onChange={(e) => setRegisterConfirmPassword(e.target.value)} required />
                  </div>
                  <Button type="submit" className="w-full" disabled={isRegisterLoading}>
                    {isRegisterLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;