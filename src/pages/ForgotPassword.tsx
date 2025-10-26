import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineMail } from "react-icons/ai";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GridBackground } from "@/components/grid-background";
import { useTheme } from "@/contexts/theme-context";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const goBack = () => {
    navigate('/login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen relative bg-background">
      {/* Grid Background */}
      <GridBackground />
      
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-[1px]" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Back Arrow */}
        <div className="p-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={goBack}
            className={`flex items-center gap-2 transition-colors ${
              theme === 'light' 
                ? 'text-black hover:text-black/80 hover:bg-black/10' 
                : 'text-white hover:text-white/80 hover:bg-white/10'
            }`}
          >
            <AiOutlineArrowLeft className="w-4 h-4" />
            Back to Login
          </Button>
        </div>

        {/* Centered Form Container */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <Card className={`w-full max-w-md border shadow-2xl ${
            theme === 'light' 
              ? 'bg-white border-gray-200' 
              : 'bg-card/95 backdrop-blur-sm border-border dark:shadow-xl'
          }`}>
            <div className="p-8">
              {!isSubmitted ? (
                <>
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-lime-100 to-green-100 dark:from-lime-900/50 dark:to-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AiOutlineMail className="w-8 h-8 text-lime-600" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-lime-700 to-green-500 bg-clip-text text-transparent mb-2">
                      Forgot Password?
                    </h1>
                    <p className="text-muted-foreground text-sm">
                      No worries! Enter your email address and we'll send you a link to reset your password.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Input 
                        placeholder="Enter your email address" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 bg-muted/50 border-border focus:border-lime-500 focus:ring-lime-500"
                        required
                      />
                    </div>

                    {/* Reset Button */}
                    <Button 
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-700 hover:to-green-700 text-white font-semibold transition-all duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </div>
                      ) : (
                        "Send Reset Link"
                      )}
                    </Button>

                    {/* Back to Login */}
                    <div className="text-center pt-4">
                      <p className="text-muted-foreground text-sm">
                        Remember your password?{" "}
                        <Link 
                          to="/login" 
                          className="text-lime-600 hover:text-lime-700 font-semibold transition-colors"
                        >
                          Back to Login
                        </Link>
                      </p>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  {/* Success State */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-lime-100 dark:from-green-900/50 dark:to-lime-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    
                    <h1 className="text-2xl font-bold text-foreground mb-4">
                      Check Your Email
                    </h1>
                    
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                      We've sent a password reset link to{" "}
                      <span className="font-semibold text-foreground">{email}</span>
                      <br />
                      Please check your email and follow the instructions to reset your password.
                    </p>

                    <Alert className="mb-6 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
                      <AlertDescription className="text-blue-800 dark:text-blue-200 text-sm">
                        Didn't receive the email? Check your spam folder or wait a few minutes before requesting another reset.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-3">
                      <Button 
                        onClick={() => setIsSubmitted(false)}
                        variant="outline"
                        className="w-full h-12 border-border hover:border-lime-500 hover:text-lime-600 transition-colors"
                      >
                        Send Another Email
                      </Button>
                      
                      <div className="text-center">
                        <Link 
                          to="/login" 
                          className="text-lime-600 hover:text-lime-700 font-semibold text-sm transition-colors"
                        >
                          Back to Login
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}