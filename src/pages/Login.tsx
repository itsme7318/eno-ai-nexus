
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) return;
    
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      // Error is handled in the AuthContext
      console.error("Login failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsSubmitting(true);
    
    try {
      await login("demo@example.com", "password");
      navigate("/");
    } catch (error) {
      console.error("Demo login failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background bg-hero-pattern p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center justify-center">
            <div className="h-12 w-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center glow">
              <span className="text-white font-bold text-xl">E</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 text-transparent bg-clip-text mb-2">
            Welcome to Eno AI
          </h1>
          <p className="text-muted-foreground">
            Your ultimate AI tools dashboard
          </p>
        </div>
        
        <Card className="border-border/30 shadow-lg bg-card/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label 
                  htmlFor="email" 
                  className="text-sm font-medium text-muted-foreground"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label 
                    htmlFor="password" 
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full" 
                onClick={handleDemoLogin}
                disabled={isSubmitting}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Try Demo Account
              </Button>
              <p className="text-sm text-center text-muted-foreground mt-4">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Create an account
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
