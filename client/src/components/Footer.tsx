import { GraduationCap, Facebook, Heart, Globe, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <GraduationCap className="mr-2" />
              <h2 className="text-xl font-medium">CodeQuiz</h2>
            </div>
            <p className="text-gray-400 max-w-md">
              Helping developers and IT professionals test and improve their skills through comprehensive coding exams and technical assessments.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-3">Languages</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">JavaScript</a></li>
                <li><a href="#" className="hover:text-white">Python</a></li>
                <li><a href="#" className="hover:text-white">Java</a></li>
                <li><a href="#" className="hover:text-white">C#</a></li>
                <li><a href="#" className="hover:text-white">SQL</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Coding Challenges</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Practice Projects</a></li>
                <li><a href="#" className="hover:text-white">Developer Forums</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            &copy; 2025 CodeQuiz. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Heart className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
