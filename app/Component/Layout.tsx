import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-indigo-500 text-white p-4">
        <nav className="container mx-auto">
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:underline">Dashboard</Link></li>
            <li><Link href="/add-property" className="hover:underline">Add Property</Link></li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow container mx-auto">
        {children}
      </main>
      <footer className="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 Property Management Dashboard</p>
      </footer>
    </div>
  );
}
