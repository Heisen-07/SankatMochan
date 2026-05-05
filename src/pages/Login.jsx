import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Lock, Mail, Loader2, HeartPulse, ShieldCheck, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/dashboard';

  const validateForm = () => {
    if (!email) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Email is invalid';
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans selection:bg-green-100 selection:text-green-900">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-green-100/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-100/50 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[440px] w-full z-10"
      >
        {/* Branding Header */}
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm border border-green-100 mb-4"
          >
            <HeartPulse className="text-[#16a34a] w-8 h-8" />
          </motion.div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Sankatmochan
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Your reliable healthcare companion
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-800">Welcome Back</h2>
              <p className="text-slate-400 text-sm mt-1">Please enter your credentials to access the portal.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 ml-1">Medical ID / Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#16a34a] transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-[#16a34a] focus:bg-white transition-all outline-none placeholder:text-slate-300"
                    placeholder="doctor@sankatmochan.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-semibold text-slate-500">Access Key</label>
                  <Link to="/forgot-password" title="Forgot Password?" className="text-xs font-medium text-[#16a34a] hover:underline underline-offset-2 transition-all">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#16a34a] transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-[#16a34a] focus:bg-white transition-all outline-none placeholder:text-slate-300"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#16a34a] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <label className="flex items-center cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="h-5 w-5 bg-slate-100 border border-slate-200 rounded-md peer-checked:bg-[#16a34a] peer-checked:border-[#16a34a] transition-all" />
                    <ShieldCheck className="absolute top-0.5 left-0.5 h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="ml-2.5 text-sm text-slate-500 group-hover:text-slate-700 transition-colors">Keep session active</span>
                </label>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-red-600 text-sm"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-[#16a34a] to-[#15803d] disabled:from-slate-300 disabled:to-slate-400 text-white font-semibold rounded-xl shadow-lg shadow-green-500/20 hover:shadow-green-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Sign into Portal</span>
                    <Activity size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
          
          {/* Footer */}
          <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              New here?{' '}
              <Link to="/register" className="text-[#16a34a] font-semibold hover:underline underline-offset-4 transition-all">
                Join Medical Network
              </Link>
            </p>
          </div>
        </div>

        {/* Support Link */}
        <div className="mt-8 text-center">
          <p className="text-[11px] text-slate-400 font-medium">
            &copy; 2026 Sankatmochan Healthcare Systems. AES-256 Encrypted.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
