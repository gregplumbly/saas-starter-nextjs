import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h5 className="font-semibold mb-2">Level Up AI Skills</h5>
            <p className="text-sm">
              Enhancing your AI capabilities, one skill at a time.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Navigation</h5>
            <ul className="space-y-1">
              <li><Link href="/contact" className="hover:text-blue-500 dark:hover:text-blue-400">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-blue-500 dark:hover:text-blue-400">Privacy Policy</Link></li>
              <li><Link href="/terms-of-use" className="hover:text-blue-500 dark:hover:text-blue-400">Terms of Use</Link></li>
            </ul>
          </div>
          <div>
            {/* Add other sections if needed, e.g., Social Media Links */}
          </div>
          <div>
            {/* Add other sections if needed */}
          </div>
        </div>
        <div className="text-center mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm">
            &copy; {currentYear} Level Up AI Skills. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
