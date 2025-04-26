import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import AuthCard from "@/components/AuthCard";

import "@/styles/auth-background.css"; // Import your CSS file for styling

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "signin";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="auth-page-container">
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-10">
         {/* New background elements similar to Mentora logo */}
         <div className="background-shapes">
           <div className="shape shape-1"></div>
           <div className="shape shape-2"></div>
           <div className="shape shape-3"></div>
           <div className="shape shape-4"></div>
         </div>
        <AuthCard 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isSubmitting={isSubmitting} 
          setIsSubmitting={setIsSubmitting}
        />
    </div>
    </div>
  );
}
