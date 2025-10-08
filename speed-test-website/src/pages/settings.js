// pages/settings.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  FiHome, FiClock, FiSettings, FiServer, FiWifi, FiMenu, FiX, 
  FiTrash2, FiInfo, FiSave 
} from 'react-icons/fi';

// Daftar server yang bisa dipilih (data simulasi)
const mockServers = [
  { id: 1, name: 'PT Telekomunikasi Indonesia', location: 'Makassar, Indonesia', ip: '192.168.1.45' },
  { id: 2, name: 'PT Fajar Techno System', location: 'Makassar, Indonesia', ip: '108.200.10.50' },
  { id: 3, name: 'Interlink Data Center', location: 'Gowa, Indonesia', ip: '175.41.10.20' },
  { id: 4, name: 'HIGEN Data Center', location: 'Samata, Gowa, Indonesia', ip: '104.16.10.1' },
];

export default function SettingsPage() {
  const [selectedServer, setSelectedServer] = useState(mockServers[0]);
  const [defaultConnectionMode, setDefaultConnectionMode] = useState('multi');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Fungsi untuk memuat pengaturan dari localStorage saat halaman dimuat
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedServerId = localStorage.getItem('selectedServerId');
      const savedMode = localStorage.getItem('defaultConnectionMode');

      if (savedServerId) {
        const server = mockServers.find(s => s.id === parseInt(savedServerId));
        if (server) setSelectedServer(server);
      }
      if (savedMode) {
        setDefaultConnectionMode(savedMode);
      }
    }
  }, []);

  // Fungsi untuk menyimpan semua pengaturan
  const saveSettings = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedServerId', selectedServer.id);
      localStorage.setItem('defaultConnectionMode', defaultConnectionMode);
      setSaveMessage('Pengaturan berhasil disimpan!');
      setTimeout(() => setSaveMessage(''), 3000); // Hilangkan pesan setelah 3 detik
    }
  };

  // Fungsi untuk menghapus semua data (riwayat dan pengaturan)
  const clearAllData = () => {
    if (typeof window !== 'undefined' && confirm('Apakah Anda yakin ingin menghapus semua data? Tindakan ini tidak dapat dibatalkan.')) {
      localStorage.removeItem('speedTestHistory');
      localStorage.removeItem('selectedServerId');
      localStorage.removeItem('defaultConnectionMode');
      // Reset state ke nilai default
      setSelectedServer(mockServers[0]);
      setDefaultConnectionMode('multi');
      setSaveMessage('Semua data telah dihapus.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  return (
    <>
      <Head>
        <title>Pengaturan - My Speedtest</title>
        <meta name="description" content="Atur preferensi tes kecepatan internet Anda" />
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
                  <Link href="/history" className="text-gray-300 hover:bg-white/10 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                    <FiClock className="mr-2" /> Riwayat
                  </Link>
                  <Link href="/settings" className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
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
                <Link href="/history" className="text-gray-300 hover:bg-white/10 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center">
                  <FiClock className="mr-2" /> Riwayat
                </Link>
                <Link href="/settings" className="bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium flex items-center">
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
            <div className="mb-8">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <FiSettings className="text-blue-400" />
                Pengaturan
              </h1>
              <p className="text-blue-200 mt-1">Atur preferensi untuk pengalaman tes yang lebih baik.</p>
            </div>

            {/* Save Message */}
            {saveMessage && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 text-green-300 rounded-lg text-center">
                {saveMessage}
              </div>
            )}

            {/* Settings Cards */}
            <div className="space-y-6">
              {/* Server Selection */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FiServer className="text-blue-400" />
                  Pilih Server Tes
                </h2>
                <p className="text-sm text-blue-200 mb-4">Pilih server yang akan digunakan untuk menguji kecepatan koneksi Anda.</p>
                <select 
                  value={selectedServer.id} 
                  onChange={(e) => setSelectedServer(mockServers.find(s => s.id === parseInt(e.target.value)))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {mockServers.map(server => (
                    <option key={server.id} value={server.id} className="bg-slate-800">
                      {server.name} ({server.location})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-blue-300 mt-2">IP Server: {selectedServer.ip}</p>
              </div>

              {/* Test Preferences */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h2 className="text-xl font-semibold mb-4">Preferensi Tes</h2>
                <p className="text-sm text-blue-200 mb-4">Atur mode koneksi default saat halaman dimuat.</p>
                <div className="space-y-3">
                  <label className="flex items-center p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-all">
                    <input 
                      type="radio" 
                      name="connectionMode" 
                      value="multi"
                      checked={defaultConnectionMode === 'multi'}
                      onChange={(e) => setDefaultConnectionMode(e.target.value)}
                      className="mr-3 w-4 h-4 text-blue-500"
                    />
                    <div>
                      <p className="font-medium">Multi-Koneksi</p>
                      <p className="text-xs text-blue-300">Menggunakan beberapa koneksi untuk kecepatan maksimal.</p>
                    </div>
                  </label>
                  <label className="flex items-center p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-all">
                    <input 
                      type="radio" 
                      name="connectionMode" 
                      value="single"
                      checked={defaultConnectionMode === 'single'}
                      onChange={(e) => setDefaultConnectionMode(e.target.value)}
                      className="mr-3 w-4 h-4 text-blue-500"
                    />
                    <div>
                      <p className="font-medium">Single-Koneksi</p>
                      <p className="text-xs text-blue-300">Menggunakan satu koneksi untuk stabilitas.</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Data Management */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FiTrash2 className="text-red-400" />
                  Manajemen Data
                </h2>
                <p className="text-sm text-blue-200 mb-4">Hapus semua riwayat tes dan kembalikan pengaturan ke default.</p>
                <button
                  onClick={clearAllData}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 rounded-lg font-medium transition-all flex items-center gap-2"
                >
                  <FiTrash2 />
                  Hapus Semua Data
                </button>
              </div>

              {/* About */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FiInfo className="text-blue-400" />
                  Tentang
                </h2>
                <div className="text-sm text-blue-200 space-y-1">
                  <p><b>My Speedtest</b></p>
                  <p>Versi 1.0.0</p>
                  <p>Aplikasi Speedtest adalah alat atau layanan online yang dirancang untuk mengukur kecepatan unduh (download), kecepatan unggah (upload), dan ping (latensi) dari koneksi internet.</p>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-8 text-center">
              <button
                onClick={saveSettings}
                className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
              >
                <FiSave />
                Simpan Pengaturan
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}