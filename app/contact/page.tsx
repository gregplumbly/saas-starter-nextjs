import { Metadata } from 'next';
import ContactForm from './contact-form';
import { Container } from '@/components/ui/container';

export const metadata: Metadata = {
  title: 'Contact Us | Level Up AI Skills',
  description: 'Get in touch with the Level Up AI Skills team. We\'re here to help with any questions about our courses or platform.',
};

export default function ContactPage() {
  return (
    <Container className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600">
            Have questions about our courses or need help with something? 
            We're here to help! Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <ContactForm />
        </div>
        
        <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <p className="text-gray-600">support@levelupai.skills</p>
          </div>
          
          <div className="p-6 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <p className="text-gray-600">San Francisco, CA</p>
          </div>
          
          <div className="p-6 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Social</h3>
            <p className="text-gray-600">@levelupai</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
