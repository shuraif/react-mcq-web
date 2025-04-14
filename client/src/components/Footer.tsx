const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <span className="material-icons mr-2">school</span>
              <h2 className="text-xl font-medium">LinguaExam</h2>
            </div>
            <p className="text-gray-400 max-w-md">
              Helping language learners test and improve their skills through comprehensive exams and personalized feedback.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-3">Languages</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Spanish</a></li>
                <li><a href="#" className="hover:text-white">French</a></li>
                <li><a href="#" className="hover:text-white">German</a></li>
                <li><a href="#" className="hover:text-white">Italian</a></li>
                <li><a href="#" className="hover:text-white">Portuguese</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Learning Tips</a></li>
                <li><a href="#" className="hover:text-white">Study Guides</a></li>
                <li><a href="#" className="hover:text-white">Practice Tests</a></li>
                <li><a href="#" className="hover:text-white">Language Forums</a></li>
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
            &copy; 2023 LinguaExam. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="material-icons">facebook</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="material-icons">favorite</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="material-icons">language</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="material-icons">email</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
