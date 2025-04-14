import { useState } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

// Form validation schema
const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional()
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false
    }
  });
  
  // Handle form submission - simply redirect to dashboard
  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Success",
        description: "You have successfully logged in"
      });
      navigate("/dashboard");
      setIsSubmitting(false);
    }, 500); // Short delay for better UX
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-8 pb-6 px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-medium text-primary-dark mb-2">LinguaExam</h1>
            <p className="text-gray-600">Master languages through examination</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="absolute text-xs top-2 left-3 text-gray-500">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your username" 
                        className="pt-7 pb-2" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="absolute text-xs top-2 left-3 text-gray-500">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Enter your password" 
                        className="pt-7 pb-2" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                        />
                      </FormControl>
                      <FormLabel className="text-sm text-gray-700 cursor-pointer">
                        Remember me
                      </FormLabel>
                    </FormItem>
                  )}
                />
                
                <a 
                  href="/forgot-password" 
                  className="text-sm font-medium text-primary hover:text-primary-dark"
                >
                  Forgot password?
                </a>
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?
              <a 
                href="/register" 
                className="font-medium text-primary hover:text-primary-dark ml-1"
              >
                Sign up
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
