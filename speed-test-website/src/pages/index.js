// pages/index.js
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  FiWifi, FiDownload, FiUpload, FiActivity, FiGlobe, FiLoader, 
  FiRefreshCw, FiServer, FiUsers, FiMenu, FiX, FiHome, FiClock, FiSettings, FiUser
} from 'react-icons/fi';

export default function InternetSpeedTest() {
  const [isTesting, setIsTesting] = useState(false);
  const [testPhase, setTestPhase] = useState('idle');
  const [results, setResults] = useState(null);
  const [liveSpeed, setLiveSpeed] = useState(0);
  const [connectedDevices, setConnectedDevices] = useState(2);
  
  // State serverInfo dan connectionMode akan diisi oleh useEffect di bawah
  const [serverInfo, setServerInfo] = useState({
    name: 'PT Telekomunikasi Indonesia',
    ip: '192.168.1.45',
    location: 'Makassar, Indonesia'
  });
  const [connectionMode, setConnectionMode] = useState('multi');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const intervalRef = useRef(null);

  // ✅ PERUBAHAN PENTING: useEffect untuk memuat pengaturan dari localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedServerId = localStorage.getItem('selectedServerId');
      const savedMode = localStorage.getItem('defaultConnectionMode');

      if (savedServerId) {
        // Daftar server yang sama dengan di halaman settings
        const mockServers = [
          { id: 1, name: 'PT Telekomunikasi Indonesia', location: 'Makassar, Indonesia', ip: '192.168.1.45' },
          { id: 2, name: 'Google Cloud Platform', location: 'Jakarta, Indonesia', ip: '108.200.10.50' },
          { id: 3, name: 'Amazon Web Services', location: 'Singapore', ip: '175.41.10.20' },
          { id: 4, name: 'Cloudflare', location: 'Tokyo, Japan', ip: '104.16.10.1' },
        ];
        const server = mockServers.find(s => s.id === parseInt(savedServerId));
        if (server) setServerInfo(server);
      }
      if (savedMode) {
        setConnectionMode(savedMode);
      }
    }
  }, []); // [] memastikan ini hanya dijalankan sekali saat halaman dimuat

  // Fungsi untuk menyimpan hasil tes ke localStorage
  const saveTestResult = (result) => {
    if (typeof window !== 'undefined') {
      const history = JSON.parse(localStorage.getItem('speedTestHistory')) || [];
      const newResult = {
        ...result,
        id: Date.now(),
        date: new Date().toLocaleString('id-ID'),
      };
      history.unshift(newResult);
      localStorage.setItem('speedTestHistory', JSON.stringify(history));
    }
  };

  // Simulate speed test phases
  const runSpeedTest = async () => {
    if (isTesting) return;
    
    setIsTesting(true);
    setTestPhase('ping');
    setLiveSpeed(0);
    setResults(null);

    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setTestPhase('download');
    let downloadSpeed = 0;
    intervalRef.current = setInterval(() => {
      downloadSpeed += Math.random() * 15;
      setLiveSpeed(downloadSpeed.toFixed(2));
    }, 100);
    
    await new Promise(resolve => setTimeout(resolve, 4000));
    clearInterval(intervalRef.current);
    const finalDownloadSpeed = downloadSpeed + (Math.random() * 20 - 10);
    
    setTestPhase('upload');
    let uploadSpeed = 0;
    intervalRef.current = setInterval(() => {
      uploadSpeed += Math.random() * 5;
      setLiveSpeed(uploadSpeed.toFixed(2));
    }, 150);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    clearInterval(intervalRef.current);
    const finalUploadSpeed = uploadSpeed + (Math.random() * 10 - 5);
    
    setTestPhase('complete');
    setLiveSpeed(0);
    
    const mockResults = {
      download: Math.max(1, finalDownloadSpeed).toFixed(2),
      upload: Math.max(0.5, finalUploadSpeed).toFixed(2),
      ping: (Math.random() * 30 + 5).toFixed(0),
      jitter: (Math.random() * 5).toFixed(1),
      server: serverInfo
    };
    
    setResults(mockResults);
    setIsTesting(false);
    setTestPhase('idle');

    saveTestResult(mockResults);
  };

  const resetTest = () => {
    setResults(null);
    setTestPhase('idle');
    setLiveSpeed(0);
  };

  const getPhaseText = () => {
    switch(testPhase) {
      case 'ping': return 'Mengukur Latensi...';
      case 'download': return 'Mengukur Kecepatan Unduh...';
      case 'upload': return 'Mengukur Kecepatan Unggah...';
      case 'complete': return 'Tes Selesai!';
      default: return 'Siap untuk Tes';
    }
  };

  const getPhaseIcon = () => {
    switch(testPhase) {
      case 'ping': return <FiActivity className="w-8 h-8" />;
      case 'download': return <FiDownload className="w-8 h-8" />;
      case 'upload': return <FiUpload className="w-8 h-8" />;
      default: return <FiWifi className="w-8 h-8" />;
    }
  };

  return (
    <>
      <Head>
        <title>My Speedtest</title>
        <meta name="description" content="Uji kecepatan koneksi internet Anda" />
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

              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/" className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                    <FiHome className="mr-2" /> Beranda
                  </Link>
                  <Link href="/history" className="text-gray-300 hover:bg-white/10 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                    <FiClock className="mr-2" /> Riwayat
                  </Link>
                  <Link href="/settings" className="text-gray-300 hover:bg-white/10 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                    <FiSettings className="mr-2" /> Pengaturan
                  </Link>
                </div>
              </div>

              {/* ✅ Ikon profil dihapus dari sini */}

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

          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href="/" className="bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium flex items-center">
                  <FiHome className="mr-2" /> Beranda
                </Link>
                <Link href="/history" className="text-gray-300 hover:bg-white/10 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center">
                  <FiClock className="mr-2" /> Riwayat
                </Link>
                <Link href="/settings" className="text-gray-300 hover:bg-white/10 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center">
                  <FiSettings className="mr-2" /> Pengaturan
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* Header */}
        <header className="py-8 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              My Speedtest
            </h1>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Ukur kecepatan download, upload, dan latency koneksi internet Anda
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            {/* Server Info & Connection Mode */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <FiServer className="text-blue-400 text-xl" />
                  <div>
                    <p className="text-sm text-blue-200">Server</p>
                    <p className="font-semibold">{serverInfo.name}</p>
                    <p className="text-xs text-blue-300">{serverInfo.ip} • {serverInfo.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 bg-white/10 rounded-xl p-1">
                  <button
                    onClick={() => setConnectionMode('multi')}
                    className={`px-4 py-2 rounded-lg transition-all ${connectionMode === 'multi' ? 'bg-blue-500 text-white' : 'text-blue-200 hover:text-white'}`}
                  >
                    Multi
                  </button>
                  <button
                    onClick={() => setConnectionMode('single')}
                    className={`px-4 py-2 rounded-lg transition-all ${connectionMode === 'single' ? 'bg-blue-500 text-white' : 'text-blue-200 hover:text-white'}`}
                  >
                    Single
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center mt-4 gap-2 text-blue-300">
                <FiUsers className="text-lg" />
                <span className="text-sm">Perangkat terhubung: <b className="text-white text-base">{connectedDevices}</b></span>
              </div>
            </div>

            {/* Test Area */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20">
              {!results ? (
                <div className="text-center">
                  <div className="relative inline-block mb-8">
                    {isTesting && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 rounded-full border-4 border-blue-400/30 animate-ping" />
                      </div>
                    )}
                    
                    <button
                      onClick={runSpeedTest}
                      disabled={isTesting}
                      className={`relative w-48 h-48 rounded-full font-bold text-6xl transition-all transform ${isTesting 
                        ? 'bg-blue-600/20 border-4 border-blue-400 cursor-default' 
                        : 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:scale-105 active:scale-95 shadow-2xl'}`}
                    >
                      {isTesting ? (
                        <div className="flex flex-col items-center justify-center">
                          {getPhaseIcon()}
                          <span className="text-3xl mt-2 font-bold">
                            {testPhase === 'download' || testPhase === 'upload' ? liveSpeed : ''}
                          </span>
                          <span className="text-xs mt-1 font-normal">
                            {testPhase === 'download' || testPhase === 'upload' ? 'Mbps' : ''}
                          </span>
                        </div>
                      ) : (
                        'GO'
                      )}
                    </button>
                  </div>
                  
                  <h2 className="text-2xl font-semibold mb-2">
                    {getPhaseText()}
                  </h2>
                  {isTesting && (
                    <div className="flex justify-center gap-2 mt-4">
                      <div className={`w-2 h-2 rounded-full bg-blue-400 ${testPhase === 'ping' ? 'animate-pulse' : ''}`} />
                      <div className={`w-2 h-2 rounded-full bg-blue-400 ${testPhase === 'download' ? 'animate-pulse' : ''}`} />
                      <div className={`w-2 h-2 rounded-full bg-blue-400 ${testPhase === 'upload' ? 'animate-pulse' : ''}`} />
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center animate-fade-in">
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                      <div className="flex items-center justify-center gap-2 mb-2 text-green-400">
                        <FiDownload className="text-2xl" />
                        <span className="text-sm font-medium">DOWNLOAD</span>
                      </div>
                      <p className="text-5xl font-bold">{results.download}</p>
                      <p className="text-lg text-blue-200">Mbps</p>
                    </div>
                    
                    <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                      <div className="flex items-center justify-center gap-2 mb-2 text-blue-400">
                        <FiUpload className="text-2xl" />
                        <span className="text-sm font-medium">UPLOAD</span>
                      </div>
                      <p className="text-5xl font-bold">{results.upload}</p>
                      <p className="text-lg text-blue-200">Mbps</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <p className="text-sm text-blue-200 mb-1">Ping</p>
                      <p className="text-2xl font-semibold">{results.ping} <span className="text-sm font-normal text-blue-200">ms</span></p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <p className="text-sm text-blue-200 mb-1">Jitter</p>
                      <p className="text-2xl font-semibold">{results.jitter} <span className="text-sm font-normal text-blue-200">ms</span></p>
                    </div>
                  </div>
                  
                  <button
                    onClick={resetTest}
                    className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
                  >
                    <FiRefreshCw />
                    Tes Lagi
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </>
  );
}