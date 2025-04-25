import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import SignInForm from "@/components/forms/SignInForm";
import SignUpForm from "@/components/forms/SignUpForm";

export default function AuthCard({ activeTab, setActiveTab, isSubmitting, setIsSubmitting }: any) {
  return (
    <Card className="w-full max-w-md border-[#5b00b3] bg-[#1E293B]">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <img src="/LOGO WEB FIN-01.png" alt="Mentora Logo" className="h-16 w-16" />
        </div>
        <CardTitle className="text-2xl font-bold text-white">Welcome to Mentora</CardTitle>
        <CardDescription className="text-gray-400">
          {activeTab === "signin" ? "Sign in to continue your learning" : "Create an account to get started"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full transition-all duration-300">
          <TabsList className="grid w-full grid-cols-2 bg-[#0F172A] relative h-10 rounded-none">
            {/* Animated underline */}
            <div 
              className={`absolute bottom-0 left-0 h-[2px] bg-[#F59E0B] transition-all duration-300 ${
                activeTab === "signin" ? "translate-x-0 w-1/2" : "translate-x-full w-1/2"
              }`}
            />
            <TabsTrigger 
              value="signin" 
              className="data-[state=active]:bg-transparent text-white relative z-10 transition-colors duration-200"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger 
              value="signup" 
              className="data-[state=active]:bg-transparent text-white relative z-10 transition-colors duration-200"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* Animated content container */}
          <div className="relative overflow-hidden mt-4" style={{ height: activeTab === "signin" ? "auto" : "auto" }}>
            {activeTab === "signin" && (
              <TabsContent value="signin" forceMount>
                <SignInForm isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} />
              </TabsContent>
            )}

            {activeTab === "signup" && (
              <TabsContent value="signup" forceMount>
                <SignUpForm isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} setActiveTab={setActiveTab} />
              </TabsContent>
            )}
          </div>
        </Tabs>
      </CardContent>

      <CardFooter className="flex flex-col items-center space-y-4">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-[#334155]" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#1E293B] px-2 text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <Button variant="outline" className="border-[#334155] text-white hover:bg-[#0F172A] hover:border-[#3B82F6] bg-transparent hover:text-white">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="white" />
            </svg>
            Google
          </Button>
          <Button variant="outline" className="border-[#334155] text-white hover:bg-[#0F172A] hover:border-[#3B82F6] bg-transparent hover:text-white">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" fill="white" />
            </svg>
            GitHub
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
