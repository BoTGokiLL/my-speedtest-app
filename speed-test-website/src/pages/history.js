// pages/history.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  FiHome, FiClock, FiDownload, FiUpload, FiActivity, 
  FiTrash2, FiServer, FiArrowLeft, FiWifi, FiSettings, FiMenu, FiX 
} from 'react-icons/fi';

export default function History() {
  const [history, setHistory] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fungsi untuk memuat riwayat dari localStorage saat halaman dimuat
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedHistory = JSON.parse(localStorage.getItem('speedTestHistory')) || [];
      setHistory(savedHistory);
    }
  }, []);

  // Fungsi untuk menghapus semua riwayat
  const clearHistory = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('speedTestHistory');
      setHistory([]);
    }
  };

  return (
    <>
      <Head>
        <title>Riwayat Tes - My Speedtest</title>
        <meta name="description" content="Lihat riwayat tes kecepatan internet Anda" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Navbar */}
        <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <FiWifi className="h-8 w-8 text-blue-400 mr-2" />
                  <span className="text-xl font-bold text-white">SpeedTest</span>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/" className="text-gray-300 hover:bg-white/10 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                    <FiHome className="mr-2" /> Beranda
                  </Link>
                  <Link href="/history" className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                    <FiClock className="mr-2" /> Riwayat
                  </Link>
                  {/* ✅ PERUBAHAN: Gunakan Link untuk navigasi ke halaman pengaturan */}
                  <Link href="/settings" className="text-gray-300 hover:bg-white/10 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                    <FiSettings className="mr-2" /> Pengaturan
                  </Link>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="bg-white/10 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
                >
                  <span className="sr-only">Open main menu</span>
                  {mobileMenuOpen ? <FiX className="block h-6 w-6" /> : <FiMenu className="block h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href="/" className="text-gray-300 hover:bg-white/10 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center">
                  <FiHome className="mr-2" /> Beranda
                </Link>
                <Link href="/history" className="bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium flex items-center">
                  <FiClock className="mr-2" /> Riwayat
                </Link>
                {/* ✅ PERUBAHAN: Gunakan Link juga di menu mobile */}
                <Link href="/settings" className="text-gray-300 hover:bg-white/10 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center">
                  <FiSettings className="mr-2" /> Pengaturan
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                  <FiClock className="text-blue-400" />
                  Riwayat Tes
                </h1>
                <p className="text-blue-200 mt-1">Lihat hasil tes kecepatan internet Anda sebelumnya.</p>
              </div>
              <Link href="/" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-all flex items-center gap-2">
                <FiArrowLeft />
                Tes Lagi
              </Link>
            </div>

            {/* History List */}
            {history.length > 0 ? (
              <div className="space-y-4">
                {history.map((result) => (
                  <div key={result.id} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xs text-blue-300">{result.date}</p>
                        <p className="text-sm text-blue-200 flex items-center gap-1 mt-1">
                          <FiServer className="text-xs" />
                          {result.server.name} ({result.server.location})
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-xs text-blue-300 mb-1">Download</p>
                        <p className="text-lg font-semibold text-green-400">{result.download} <span className="text-xs font-normal">Mbps</span></p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-300 mb-1">Upload</p>
                        <p className="text-lg font-semibold text-blue-400">{result.upload} <span className="text-xs font-normal">Mbps</span></p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-300 mb-1">Ping</p>
                        <p className="text-lg font-semibold">{result.ping} <span className="text-sm font-normal text-blue-200">ms</span></p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-300 mb-1">Jitter</p>
                        <p className="text-lg font-semibold">{result.jitter} <span className="text-sm font-normal text-blue-200">ms</span></p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Clear History Button */}
                <div className="text-center mt-8">
                  <button
                    onClick={clearHistory}
                    className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 rounded-lg font-medium transition-all flex items-center gap-2 mx-auto"
                  >
                    <FiTrash2 />
                    Hapus Semua Riwayat
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <FiClock className="w-16 h-16 text-blue-400/50 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-blue-200">Belum Ada Riwayat</h2>
                <p className="text-blue-300 mt-2">Anda belum melakukan tes kecepatan sama sekali.</p>
                <Link href="/" className="inline-block mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition-all">
                  Mulai Tes Sekarang
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}