import { FlameKindling } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <FlameKindling size={64} className="mx-auto text-orange-500" />
        </div>
        <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
          Level Up Your AI Skills
        </h1>
        <p className="text-xl text-gray-300 mb-10">
          Practical AI training for professionals who want to stay relevant in a fast-changing world.
        </p>
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl">
          <h2 className="text-3xl font-semibold mb-4 text-orange-400">
            Coming Soon...
          </h2>
          <p className="text-lg text-gray-400">
            Whether you’re a marketer, manager, freelancer, or founder — AI is reshaping the way we work.
            We're building a learning platform to help you stay ahead, work smarter, and make AI part of your toolkit.
          </p>
        </div>
        <footer className="mt-12 text-gray-500">
          <p>&copy; {new Date().getFullYear()} Level Up AI Skills. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
