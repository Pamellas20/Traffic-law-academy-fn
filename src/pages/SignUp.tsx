import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { GridBackground } from "@/components/grid-background";
import { useTheme } from "@/contexts/theme-context";
import { useSignupMutation } from "@/store/api/authApiSlice";
import { toast } from "sonner";

const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine((val) => val === true, "You must agree to the terms and conditions"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignUp() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signup, { isLoading, error }] = useSignupMutation();
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      agreeToTerms: false,
    },
  });

  const agreeToTerms = watch("agreeToTerms");
  
  const goBack = () => {
    navigate('/');
  };

  const onSubmit = async (data: SignupFormData) => {
    try {
      const { confirmPassword, agreeToTerms, ...signupData } = data;
      await signup(signupData).unwrap();
      
      toast.success("Account created successfully! Please log in to continue.");
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create account. Please try again.");
    }
  };

  // Show API error if any
  useEffect(() => {
    if (error && 'data' in error) {
      toast.error((error.data as any)?.message || "Failed to create account. Please try again.");
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
            className={`flex items-center gap-2 transition-colors ${
              theme === 'light' 
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
          <Card className={`w-full max-w-md border shadow-2xl ${
            theme === 'light' 
              ? 'bg-white border-gray-200' 
              : 'bg-card/95 backdrop-blur-sm border-border dark:shadow-xl'
          }`}>
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-lime-700 to-green-500 bg-clip-text text-transparent mb-2">
                  Create Account
                </h1>
                <p className="text-muted-foreground text-sm">
                  Start your journey to mastering traffic rules
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Input 
                        {...register("firstName")}
                        placeholder="First name" 
                        type="text" 
                        className="h-12 bg-muted/50 border-border focus:border-lime-500 focus:ring-lime-500"
                        disabled={isLoading}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <Input 
                        {...register("lastName")}
                        placeholder="Last name" 
                        type="text" 
                        className="h-12 bg-muted/50 border-border focus:border-lime-500 focus:ring-lime-500"
                        disabled={isLoading}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Email */}
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
                  
                  {/* Password Fields */}
                  <div className="space-y-3">
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
                        <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                      )}
                    </div>
                    
                    <div className="relative">
                      <Input 
                        {...register("confirmPassword")}
                        placeholder="Confirm password" 
                        type={showConfirmPassword ? "text" : "password"}
                        className="h-12 bg-muted/50 border-border focus:border-lime-500 focus:ring-lime-500 pr-12"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <AiOutlineEyeInvisible className="w-5 h-5" />
                        ) : (
                          <AiOutlineEye className="w-5 h-5" />
                        )}
                      </button>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3">
                  <Controller
                    name="agreeToTerms"
                    control={control}
                    render={({ field }) => (
                      <Checkbox 
                        id="terms" 
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1 data-[state=checked]:bg-lime-600 data-[state=checked]:border-lime-600"
                        disabled={isLoading}
                      />
                    )}
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground leading-5">
                    I agree to the{" "}
                    <Link to="/terms" className="text-lime-600 hover:text-lime-700 transition-colors">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-lime-600 hover:text-lime-700 transition-colors">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {errors.agreeToTerms && (
                  <p className="text-red-500 text-sm">{errors.agreeToTerms.message}</p>
                )}

                {/* Sign Up Button */}
                <Button 
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-700 hover:to-green-700 text-white font-semibold transition-all duration-300 disabled:opacity-50"
                  disabled={!agreeToTerms || isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>

                {/* Login Link */}
                <div className="text-center pt-4">
                  <p className="text-muted-foreground text-sm">
                    Already have an account?{" "}
                    <Link 
                      to="/login" 
                      className="text-lime-600 hover:text-lime-700 font-semibold transition-colors"
                    >
                      Sign in here
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
