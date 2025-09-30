import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Zap, Users, Code, ArrowRight, Check, Send, Sparkles, Phone, Globe, Building2, Bot } from 'lucide-react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8001';
const API = `${API_BASE}/api`;

const Threetone = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', company: '', message: '' });
  const [contactStatus, setContactStatus] = useState({ type: '', message: '' });
  const [isContactLoading, setIsContactLoading] = useState(false);
  const chatEndRef = useRef(null);
  const demoSectionRef = useRef(null);

  const scrollToDemo = () => {
    demoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsChatLoading(true);

    try {
      const response = await axios.post(`${API}/chat-demo`, {
        message: userMessage,
        context: { source: 'website_demo' }
      });

      if (response.data.success) {
        setChatMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
      } else {
        setChatMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I\'m having trouble connecting. Please try again.' }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsContactLoading(true);
    setContactStatus({ type: '', message: '' });

    try {
      const response = await axios.post(`${API}/contact-sales`, contactForm);

      if (response.data.success) {
        setContactStatus({ type: 'success', message: response.data.message });
        setContactForm({ name: '', email: '', company: '', message: '' });
      } else {
        setContactStatus({ type: 'error', message: response.data.error || 'Failed to submit form' });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setContactStatus({ type: 'error', message: 'Failed to submit. Please try again.' });
    } finally {
      setIsContactLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <nav className="relative z-10 container mx-auto px-6 py-6 flex justify-between items-center border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-black">threetone</span>
          </div>
          <div className="hidden md:flex space-x-8 text-gray-600 font-medium">
            <a href="#features" className="hover:text-black transition">Features</a>
            <a href="#use-cases" className="hover:text-black transition">Use Cases</a>
            <a href="#demo" className="hover:text-black transition">Demo</a>
            <a href="#developers" className="hover:text-black transition">Developers</a>
          </div>
          <Button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="bg-black hover:bg-gray-800 text-white">
            Contact Sales
          </Button>
        </nav>

        <div className="relative z-10 container mx-auto px-6 py-24 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold text-black mb-6 leading-tight">
              Conversational AI That Understands Your Business
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
              Power your customer interactions with intelligent AI that sounds natural, responds instantly, and scales effortlessly. Built for businesses that demand excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={scrollToDemo} size="lg" className="bg-black hover:bg-gray-800 text-white text-lg px-8 py-6">
                Try Live Demo <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} size="lg" variant="outline" className="border-gray-300 text-black hover:bg-gray-50 text-lg px-8 py-6">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative z-10 container mx-auto px-6 py-24 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600">Everything you need for enterprise-grade conversational AI</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg transition">
            <CardHeader>
              <MessageCircle className="w-12 h-12 text-black mb-4" />
              <CardTitle className="text-black">Natural Conversations</CardTitle>
              <CardDescription className="text-gray-600">
                AI that understands context, emotion, and intent for truly natural interactions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg transition">
            <CardHeader>
              <Zap className="w-12 h-12 text-black mb-4" />
              <CardTitle className="text-black">Lightning Fast</CardTitle>
              <CardDescription className="text-gray-600">
                Sub-second response times that keep your customers engaged and satisfied
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg transition">
            <CardHeader>
              <Users className="w-12 h-12 text-black mb-4" />
              <CardTitle className="text-black">Unlimited Scale</CardTitle>
              <CardDescription className="text-gray-600">
                Handle thousands of conversations simultaneously without breaking a sweat
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg transition">
            <CardHeader>
              <Code className="w-12 h-12 text-black mb-4" />
              <CardTitle className="text-black">Easy Integration</CardTitle>
              <CardDescription className="text-gray-600">
                Simple APIs and SDKs to integrate AI into your existing workflows
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Use Cases Section */}
      <div id="use-cases" className="relative z-10 container mx-auto px-6 py-24 bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Built for Every Industry</h2>
          <p className="text-xl text-gray-600">See how threetone transforms business operations</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white border-gray-200 hover:shadow-lg transition">
            <CardHeader>
              <Phone className="w-10 h-10 text-black mb-3" />
              <CardTitle className="text-black">Customer Support</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start"><Check className="w-5 h-5 text-black mr-2 mt-0.5 flex-shrink-0" /> 24/7 instant support</li>
                <li className="flex items-start"><Check className="w-5 h-5 text-black mr-2 mt-0.5 flex-shrink-0" /> Reduce response time by 90%</li>
                <li className="flex items-start"><Check className="w-5 h-5 text-black mr-2 mt-0.5 flex-shrink-0" /> Handle complex queries</li>
                <li className="flex items-start"><Check className="w-5 h-5 text-black mr-2 mt-0.5 flex-shrink-0" /> Seamless escalation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 hover:shadow-lg transition">
            <CardHeader>
              <Globe className="w-10 h-10 text-black mb-3" />
              <CardTitle className="text-black">Sales Automation</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start"><Check className="w-5 h-5 text-black mr-2 mt-0.5 flex-shrink-0" /> Qualify leads automatically</li>
                <li className="flex items-start"><Check className="w-5 h-5 text-black mr-2 mt-0.5 flex-shrink-0" /> Book meetings instantly</li>
                <li className="flex items-start"><Check className="w-5 h-5 text-black mr-2 mt-0.5 flex-shrink-0" /> Personalized outreach</li>
                <li className="flex items-start"><Check className="w-5 h-5 text-black mr-2 mt-0.5 flex-shrink-0" /> Increase conversion rates</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 hover:shadow-lg transition">
            <CardHeader>
              <Building2 className="w-10 h-10 text-black mb-3" />
              <CardTitle className="text-black">Enterprise Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start"><Check className="w-5 h-5 text-black mr-2 mt-0.5 flex-shrink-0" /> Internal helpdesk</li>
                <li className="flex items-start"><Check className="w-5 h-5 text-black mr-2 mt-0.5 flex-shrink-0" /> Process automation</li>
                <li className="flex items-start"><Check className="w-5 h-5 text-black mr-2 mt-0.5 flex-shrink-0" /> Knowledge base queries</li>
                <li className="flex items-start"><Check className="w-5 h-5 text-black mr-2 mt-0.5 flex-shrink-0" /> Workflow optimization</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Interactive Demo Section */}
      <div ref={demoSectionRef} id="demo" className="relative z-10 container mx-auto px-6 py-24 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Experience It Live</h2>
          <p className="text-xl text-gray-600">Try our conversational AI right now</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="bg-white border-gray-200 shadow-xl">
            <CardHeader className="border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Bot className="w-8 h-8 text-black" />
                <div>
                  <CardTitle className="text-black">Chat with threetone AI</CardTitle>
                  <CardDescription className="text-gray-600">Ask me anything about our platform</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto mb-4 space-y-4">
                {chatMessages.length === 0 && (
                  <div className="text-center text-gray-500 mt-32">
                    <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Start a conversation to see threetone in action</p>
                  </div>
                )}
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      msg.role === 'user'
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-900 border border-gray-200 rounded-lg p-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleChatSubmit} className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-white border-gray-300 text-black placeholder:text-gray-500"
                  disabled={isChatLoading}
                />
                <Button type="submit" disabled={isChatLoading || !chatInput.trim()} className="bg-black hover:bg-gray-800 text-white">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pricing/Value Section */}
      <div id="pricing" className="relative z-10 container mx-auto px-6 py-24 bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Cost-Effective at Scale</h2>
          <p className="text-xl text-gray-600">Enterprise power at a fraction of the cost</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition">
              <div className="text-5xl font-bold text-black mb-2">90%</div>
              <div className="text-gray-900 font-semibold">Cost Reduction</div>
              <p className="text-sm text-gray-600 mt-2">vs traditional call centers</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition">
              <div className="text-5xl font-bold text-black mb-2">24/7</div>
              <div className="text-gray-900 font-semibold">Availability</div>
              <p className="text-sm text-gray-600 mt-2">Never miss a customer</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition">
              <div className="text-5xl font-bold text-black mb-2">&lt;1s</div>
              <div className="text-gray-900 font-semibold">Response Time</div>
              <p className="text-sm text-gray-600 mt-2">Lightning fast interactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Sales Section */}
      <div id="contact" className="relative z-10 container mx-auto px-6 py-24 bg-white">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white border-gray-200 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-black mb-2">Get Started with threetone</CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Let's discuss how conversational AI can transform your business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="bg-white border-gray-300 text-black placeholder:text-gray-500"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Work Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="bg-white border-gray-300 text-black placeholder:text-gray-500"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Company Name"
                    value={contactForm.company}
                    onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                    className="bg-white border-gray-300 text-black placeholder:text-gray-500"
                    required
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Tell us about your use case..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="bg-white border-gray-300 text-black placeholder:text-gray-500 min-h-32"
                    required
                  />
                </div>

                {contactStatus.message && (
                  <div className={`p-4 rounded-lg ${
                    contactStatus.type === 'success'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {contactStatus.message}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 text-white text-lg py-6"
                  disabled={isContactLoading}
                >
                  {isContactLoading ? 'Submitting...' : 'Contact Sales'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Developers Section */}
      <div id="developers" className="relative z-10 container mx-auto px-6 py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <Code className="w-16 h-16 text-black mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Build on threetone</h2>
          <p className="text-xl text-gray-600 mb-8">
            Powerful APIs and SDKs for developers to create custom conversational AI experiences
          </p>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-left">
            <pre className="text-green-400 text-sm overflow-x-auto">
              <code>{`// Quick start example
import { Threetone } from '@threetone/sdk';

const client = new Threetone({ apiKey: 'your-api-key' });

const response = await client.chat.create({
  messages: [{ role: 'user', content: 'Hello!' }],
  model: 'threetone-pro'
});

console.log(response.content);`}</code>
            </pre>
          </div>
          <div className="mt-8 space-x-4">
            <Button className="bg-black hover:bg-gray-800 text-white">
              View Documentation
            </Button>
            <Button variant="outline" className="border-gray-300 text-black hover:bg-gray-100">
              API Reference
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-black">threetone</span>
              </div>
              <p className="text-gray-600 text-sm">
                Next-generation conversational AI for modern businesses.
              </p>
            </div>

            <div>
              <h3 className="text-black font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#features" className="hover:text-black transition">Features</a></li>
                <li><a href="#use-cases" className="hover:text-black transition">Use Cases</a></li>
                <li><a href="#demo" className="hover:text-black transition">Demo</a></li>
                <li><a href="#pricing" className="hover:text-black transition">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-black font-semibold mb-4">Developers</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#developers" className="hover:text-black transition">Documentation</a></li>
                <li><a href="#developers" className="hover:text-black transition">API Reference</a></li>
                <li><a href="#developers" className="hover:text-black transition">SDKs</a></li>
                <li><a href="#developers" className="hover:text-black transition">Examples</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-black font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#contact" className="hover:text-black transition">Contact</a></li>
                <li><a href="#" className="hover:text-black transition">About</a></li>
                <li><a href="#" className="hover:text-black transition">Blog</a></li>
                <li><a href="#" className="hover:text-black transition">Careers</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600 text-sm">
            <p>&copy; 2025 threetone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Threetone;