const Footer = () => {
    return (
      <footer className="bg-gray-900 container mx-auto text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">HomeScape</h2>
              <p>
                Your trusted real estate partner offering seamless experiences for
                buyers, sellers, and investors alike.
              </p>
            </div>
  
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
              <ul>
                <li className="mb-2">
                  <i className="fas fa-phone-alt mr-2"></i> +880 123-456-7890
                </li>
                <li className="mb-2">
                  <i className="fas fa-envelope mr-2"></i> support@homescape.com
                </li>
                <li className="mb-2">
                  <i className="fas fa-map-marker-alt mr-2"></i> Dhaka, Bangladesh
                </li>
              </ul>
            </div>
  
            {/* Useful Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Useful Links
              </h3>
              <ul>
                <li className="mb-2 hover:text-white transition-colors">
                  <a href="#">About Us</a>
                </li>
                <li className="mb-2 hover:text-white transition-colors">
                  <a href="#">Services</a>
                </li>
                <li className="mb-2 hover:text-white transition-colors">
                  <a href="#">Properties</a>
                </li>
                <li className="mb-2 hover:text-white transition-colors">
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
  
            {/* Newsletter Subscription */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Stay Connected
              </h3>
              <p className="mb-4">
                Subscribe to our newsletter for the latest updates and offers.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 w-full rounded-l bg-gray-800 text-gray-300 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-500 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
  
          {/* Divider */}
          <div className="border-t border-gray-700 mt-8"></div>
  
          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-8">
            <p className="text-sm text-center">
              &copy; {new Date().getFullYear()} HomeScape. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  