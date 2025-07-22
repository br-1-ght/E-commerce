import { useState } from 'react';
import { useTheme } from './services/ThemeContext';

const ContactUs = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Contact form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen py-12 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Contact Us</h1>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Have a question, suggestion, or need help? We'd love to hear from you. 
            Send us a message and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className={`text-2xl font-semibold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Get in Touch</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className={`text-xl mt-1 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>📍</div>
                  <div>
                    <h3 className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Address</h3>
                    <p className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>Abijo G.R.A Ibeju-lekki<br />Ajah<br />Lagos, Nigeria</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className={`text-xl mt-1 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>📞</div>
                  <div>
                    <h3 className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Phone</h3>
                    <p className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>+234 818 817 9399</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className={`text-xl mt-1 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>✉️</div>
                  <div>
                    <h3 className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Email</h3>
                    <p className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>brightigwe417@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className={`text-xl mt-1 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>🕒</div>
                  <div>
                    <h3 className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Business Hours</h3>
                    <p className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Monday - Friday: 6:00 AM - 10:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className={`text-xl font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Frequently Asked Questions</h3>
              <div className="space-y-3">
                <div className={`border rounded-lg p-4 ${
                  isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                }`}>
                  <h4 className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>What is your return policy?</h4>
                  <p className={`text-sm mt-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>We offer a 30-day return policy for all unused items in original packaging.</p>
                </div>
                <div className={`border rounded-lg p-4 ${
                  isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                }`}>
                  <h4 className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>How long does shipping take?</h4>
                  <p className={`text-sm mt-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Standard shipping takes 3-5 business days, express shipping takes 1-2 business days.</p>
                </div>
                <div className={`border rounded-lg p-4 ${
                  isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                }`}>
                  <h4 className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Do you offer international shipping?</h4>
                  <p className={`text-sm mt-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Yes, we ship to most countries worldwide. Shipping costs vary by destination.</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`rounded-lg shadow-md p-8 ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            <h2 className={`text-2xl font-semibold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Send us a Message</h2>
            
            {submitStatus === 'success' && (
              <div className={`border rounded-lg p-4 mb-6 ${
                isDarkMode ? 'bg-green-900 border-green-700' : 'bg-green-50 border-green-200'
              }`}>
                <div className="flex items-center">
                  <span className={`mr-2 ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`}>✅</span>
                  <p className={`${
                    isDarkMode ? 'text-green-300' : 'text-green-800'
                  }`}>Thank you! Your message has been sent successfully.</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className={`border rounded-lg p-4 mb-6 ${
                isDarkMode ? 'bg-red-900 border-red-700' : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center">
                  <span className={`mr-2 ${
                    isDarkMode ? 'text-red-400' : 'text-red-600'
                  }`}>❌</span>
                  <p className={`${
                    isDarkMode ? 'text-red-300' : 'text-red-800'
                  }`}>Sorry, there was an error sending your message. Please try again.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="+234 901 222 5555"
                />
              </div>

              <div>
                <label htmlFor="subject" className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Support</option>
                  <option value="return">Returns & Refunds</option>
                  <option value="technical">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                  isDarkMode 
                    ? isSubmitting 
                      ? 'bg-blue-500 text-gray-300 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                    : isSubmitting 
                      ? 'bg-blue-400 text-white cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;