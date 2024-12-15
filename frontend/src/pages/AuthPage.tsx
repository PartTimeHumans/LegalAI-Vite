import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Mail, Lock, Eye, EyeOff, UserPlus, LogIn, Gavel, UserIcon as UserTie, User } from 'lucide-react';

type Role = 'judge' | 'lawyer' | 'user';

interface FormInputs {
  email: string;
  password: string;
  reenterPassword: string;
  role: Role;
}

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignUp = location.pathname === '/signup';

  const [inputs, setInputs] = useState<FormInputs>({
    email: '',
    password: '',
    reenterPassword: '',
    role: 'user',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isFormValid = isSignUp
    ? inputs.email && inputs.password && inputs.password === inputs.reenterPassword && inputs.role
    : inputs.email && inputs.password;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleRoleChange = (role: Role) => {
    setInputs((prevInputs) => ({ ...prevInputs, role }));
  };

  const handleAuth = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    const apiUrl = 'http://127.0.0.1:4001/api/v1/accounts/login/';
    const payload = {
      email: inputs.email,
      password: inputs.password,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('Login successful!');
        if (result.token) {
          localStorage.setItem('authToken', result.token);
          navigate('/dashboard');
        } else {
          setError('No token received. Please try again.');
        }
      } else {
        setError(result.message || 'Invalid email or password.');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    setInputs({
      email: '',
      password: '',
      reenterPassword: '',
      role: 'user',
    });
    setError(null);
    setSuccessMessage(null);
  }, [isSignUp]);

  const roleIcons: Record<Role, React.ReactNode> = {
    judge: <Gavel className="w-5 h-5" />,
    lawyer: <UserTie className="w-5 h-5" />,
    user: <User className="w-5 h-5" />,
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-8 bg-white shadow-2xl rounded-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="p-3 mx-auto rounded-full bg-primary/10 w-fit"
        >
          <Scale className="w-10 h-10 text-primary" />
        </motion.div>
        <h1 className="text-4xl font-bold text-center text-primary">
          {isSignUp ? 'Sign Up' : 'Log In'}
        </h1>
        <div className="space-y-6">
          <div className="relative">
            <Mail className="absolute w-5 h-5 text-gray-400 top-3 left-3" />
            <input
              className="w-full py-3 pl-10 pr-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-primary"
              type="email"
              placeholder="Email address"
              name="email"
              value={inputs.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="relative">
            <Lock className="absolute w-5 h-5 text-gray-400 top-3 left-3" />
            <input
              className="w-full py-3 pl-10 pr-10 bg-gray-100 rounded-lg focus:ring-2 focus:ring-primary"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="absolute top-3 right-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* Re-enter Password */}
          {isSignUp && (
            <div className="relative">
              <Lock className="absolute w-5 h-5 text-gray-400 top-3 left-3" />
              <input
                className="w-full py-3 pl-10 pr-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-primary"
                type="password"
                placeholder="Re-enter Password"
                name="reenterPassword"
                value={inputs.reenterPassword}
                onChange={handleInputChange}
              />
            </div>
          )}

          {/* Role Selection */}
          {isSignUp && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Select your role:</label>
              <div className="flex justify-between">
                {(['judge', 'lawyer', 'user'] as Role[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => handleRoleChange(role)}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg ${
                      inputs.role === role ? 'bg-primary text-white' : 'bg-gray-100'
                    }`}
                  >
                    {roleIcons[role]} <span className="ml-2 capitalize">{role}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleAuth}
            disabled={!isFormValid || isLoading}
            className={`w-full py-3 text-white rounded-lg ${
              isFormValid ? 'bg-primary hover:bg-primary-dark' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Log In'}
          </button>

          {/* Error & Success Messages */}
          <AnimatePresence>
            {error && <div className="text-red-500">{error}</div>}
            {successMessage && <div className="text-green-500">{successMessage}</div>}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
