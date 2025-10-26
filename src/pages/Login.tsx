import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GridBackground } from "@/components/grid-background";
import { useTheme } from "@/contexts/theme-context";
import { useLoginMutation } from "@/store/api/authApiSlice";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const goBack = () => {
    navigate('/');
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login(data).unwrap();
      
      // Store credentials in Redux store and localStorage
      dispatch(setCredentials({
        user: result.user as any,
        access_token: result.access_token,
      }));

      toast.success("Login successful! Welcome back.");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed. Please try again.");
    }
  };

  // Show API error if any
  useEffect(() => {
    if (error && 'data' in error) {
      toast.error((error.data as any)?.message || "Login failed. Please try again.");
    }
  }, [error]);

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
            className={`flex items-center gap-2 transition-colors ${theme === 'light'
              ? 'text-black hover:text-black/80 hover:bg-black/10'
              : 'text-white hover:text-white/80 hover:bg-white/10'
              }`}
          >
            <AiOutlineArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>

        {/* Centered Form Container */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <Card className={`w-full max-w-md border shadow-2xl ${theme === 'light'
            ? 'bg-white border-gray-200'
            : 'bg-card/95 backdrop-blur-sm border-border dark:shadow-xl'
            }`}>
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-lime-700 to-green-500 bg-clip-text text-transparent mb-2">
                  Welcome Back
                </h1>
                <p className="text-muted-foreground text-sm">
                  Access your courses and continue learning
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Input
                      {...register("email")}
                      placeholder="Email address"
                      type="email"
                      className="h-12 bg-muted/50 border-border focus:border-lime-500 focus:ring-lime-500"
                      disabled={isLoading}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="relative">
                    <Input
                      {...register("password")}
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      className="h-12 bg-muted/50 border-border focus:border-lime-500 focus:ring-lime-500 pr-12"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible className="w-5 h-5" />
                      ) : (
                        <AiOutlineEye className="w-5 h-5" />
                      )}
                    </button>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-lime-600 hover:text-lime-700 transition-colors"
                  >
                    Forgot your password?
                  </Link>
                </div>

                {/* Login Button */}
                <Button 
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-700 hover:to-green-700 text-white font-semibold transition-all duration-300" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>

                {/* Sign Up Link */}
                <div className="text-center pt-4">
                  <p className="text-muted-foreground text-sm">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-lime-600 hover:text-lime-700 font-semibold transition-colors"
                    >
                      Create one here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
