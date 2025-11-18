import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Sun, Moon, Globe } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (email: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('es');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Por favor ingresa tu correo electrónico');
      return;
    }

    if (!password) {
      setError('Por favor ingresa tu contraseña');
      return;
    }

    // Simple validation - in a real app, this would authenticate with a backend
    if (!email.includes('@')) {
      setError('Por favor ingresa un correo electrónico válido');
      return;
    }

    onLogin(email);
  };

  const themeClasses = darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900';
  const cardClasses = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const buttonSecondary = darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800';

  return (
    <div className={`min-h-screen ${themeClasses} transition-colors duration-200 flex items-center justify-center p-4`}>
      {/* Header controls */}
      <div className="fixed top-4 right-4 flex items-center space-x-3">
        <button
          onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
          className={`${buttonSecondary} p-2 rounded-lg`}
          title="Cambiar idioma"
        >
          <Globe className="w-5 h-5" />
        </button>
        
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`${buttonSecondary} p-2 rounded-lg`}
          title="Modo oscuro/claro"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Login Card */}
      <div className={`${cardClasses} border rounded-lg p-8 max-w-md w-full shadow-lg`}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl mb-2 text-blue-600">MailFlow Pro</h1>
          <p className="text-gray-500">Automatización de correos electrónicos</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm mb-2">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
                placeholder="usuario@ejemplo.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors duration-200 flex items-center justify-center flex items-center justify-center"
          >
            Iniciar sesión
          </button>

          <div className="text-center text-sm text-gray-500">
            <a href="#" className="text-blue-500 hover:text-blue-600">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          ¿No tienes una cuenta?{' '}
          <a href="#" className="text-blue-500 hover:text-blue-600">
            Registrarse
          </a>
        </div>
      </div>

    </div>
  );
}