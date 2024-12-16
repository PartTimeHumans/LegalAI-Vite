<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Scale, Mail, Lock, Eye, EyeOff, Gavel, UserIcon as UserTie, User } from 'lucide-react';
=======
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Scale,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Gavel,
  UserIcon as UserTie,
  User,
} from "lucide-react";
import Cookies from "js-cookie";
>>>>>>> f626b8e (update permissions)

type Role = "judge" | "lawyer" | "user";

interface FormInputs {
  email: string;
  password: string;
  reenterPassword: string;
  role: Role;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: -50 },
<<<<<<< HEAD
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
=======
  visible: {
    opacity: 1,
    y: 0,
    transition: {
>>>>>>> f626b8e (update permissions)
      type: "spring",
      stiffness: 300,
      damping: 30,
      when: "beforeChildren",
<<<<<<< HEAD
      staggerChildren: 0.2
    }
  },
  exit: { 
    opacity: 0, 
    y: 50,
    transition: { 
=======
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: {
>>>>>>> f626b8e (update permissions)
      type: "spring",
      stiffness: 300,
      damping: 30,
      when: "afterChildren",
<<<<<<< HEAD
      staggerChildren: 0.1
    }
  }
=======
      staggerChildren: 0.1,
    },
  },
>>>>>>> f626b8e (update permissions)
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
<<<<<<< HEAD
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  }
=======
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
>>>>>>> f626b8e (update permissions)
};

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignUp = location.pathname === "/signup";

  const [inputs, setInputs] = useState<FormInputs>({
    email: "",
    password: "",
    reenterPassword: "",
    role: "user",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isFormValid = isSignUp
    ? inputs.email &&
      inputs.password &&
      inputs.password === inputs.reenterPassword &&
      inputs.role
    : inputs.email && inputs.password;

<<<<<<< HEAD
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  }, []);
=======
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    },
    []
  );
>>>>>>> f626b8e (update permissions)

  const handleRoleChange = useCallback((role: Role) => {
    setInputs((prevInputs) => ({ ...prevInputs, role }));
  }, []);

  const handleAuth = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    const apiUrl = isSignUp
      ? "http://localhost:4001/api/v1/accounts/register"
      : "http://localhost:4001/api/v1/accounts/login";

    const payload = {
      email: inputs.email,
      password: inputs.password,
      role: inputs.role,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(
          isSignUp ? "Sign up successful!" : "Login successful!"
        );

        Cookies.set("authToken", result.token, { expires: 1 });
        Cookies.set("userRole", result.userData.role, { path: "/" });

        if (result.userData.role === "Lawyer") {
          navigate("/LawyerDashboard");
        } else if (result.userData.role === "judge") {
          navigate("/JudgeDashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(result.message || "Something went wrong.");
      }
    } catch (err) {
<<<<<<< HEAD
      setError('Failed to connect to the server. Please check your connection.');
=======
      setError(
        "Failed to connect to the server. Please check your connection."
      );
>>>>>>> f626b8e (update permissions)
      console.error(err);
    } finally {
      setIsLoading(false);
    }
<<<<<<< HEAD
  }, [inputs.email, inputs.password, navigate]);
=======
  }, [inputs, isSignUp, navigate]);
>>>>>>> f626b8e (update permissions)

  useEffect(() => {
    setInputs({
      email: "",
      password: "",
      reenterPassword: "",
      role: "user",
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
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-b from-background to-secondary/10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full max-w-md p-6 space-y-6 bg-white shadow-2xl sm:p-8 sm:space-y-8 rounded-2xl"
      >
        <motion.div
          variants={itemVariants}
          className="p-3 mx-auto rounded-full bg-primary/10 w-fit"
        >
          <Scale className="w-10 h-10 text-primary" />
        </motion.div>
<<<<<<< HEAD
        <motion.h1 
          variants={itemVariants}
          className="text-3xl font-bold text-center sm:text-4xl text-primary"
        >
          {isSignUp ? 'Sign Up' : 'Log In'}
=======
        <motion.h1
          variants={itemVariants}
          className="text-3xl font-bold text-center sm:text-4xl text-primary"
        >
          {isSignUp ? "Sign Up" : "Log In"}
>>>>>>> f626b8e (update permissions)
        </motion.h1>
        <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
          <motion.div variants={itemVariants} className="relative">
            <Mail className="absolute w-5 h-5 text-gray-400 top-3 left-3" />
            <input
              className="w-full py-3 pl-10 pr-3 transition-all duration-300 ease-in-out bg-gray-100 rounded-lg focus:ring-2 focus:ring-primary"
              type="email"
              placeholder="Email address"
              name="email"
              value={inputs.email}
              onChange={handleInputChange}
            />
          </motion.div>
          <motion.div variants={itemVariants} className="relative">
            <Lock className="absolute w-5 h-5 text-gray-400 top-3 left-3" />
            <input
              className="w-full py-3 pl-10 pr-10 transition-all duration-300 ease-in-out bg-gray-100 rounded-lg focus:ring-2 focus:ring-primary"
<<<<<<< HEAD
              type={showPassword ? 'text' : 'password'}
=======
              type={showPassword ? "text" : "password"}
>>>>>>> f626b8e (update permissions)
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="absolute top-3 right-3 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              <motion.div
                initial={false}
                animate={{ rotate: showPassword ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
<<<<<<< HEAD
                {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
=======
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
>>>>>>> f626b8e (update permissions)
              </motion.div>
            </button>
          </motion.div>

          <AnimatePresence mode="wait">
            {isSignUp && (
              <motion.div
                key="reenter-password"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative"
              >
                <Lock className="absolute w-5 h-5 text-gray-400 top-3 left-3" />
                <input
                  className="w-full py-3 pl-10 pr-3 transition-all duration-300 ease-in-out bg-gray-100 rounded-lg focus:ring-2 focus:ring-primary"
                  type="password"
                  placeholder="Re-enter Password"
                  name="reenterPassword"
                  value={inputs.reenterPassword}
                  onChange={handleInputChange}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {isSignUp && (
              <motion.div
                key="role-selection"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-2"
              >
                <label className="text-sm font-medium">Select your role:</label>
                <div className="flex flex-wrap gap-2 sm:flex-nowrap">
<<<<<<< HEAD
                  {(['judge', 'lawyer', 'user'] as Role[]).map((role) => (
=======
                  {(["judge", "lawyer", "user"] as Role[]).map((role) => (
>>>>>>> f626b8e (update permissions)
                    <motion.button
                      key={role}
                      onClick={() => handleRoleChange(role)}
                      className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out ${
<<<<<<< HEAD
                        inputs.role === role ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
=======
                        inputs.role === role
                          ? "bg-primary text-white"
                          : "bg-gray-100 hover:bg-gray-200"
>>>>>>> f626b8e (update permissions)
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center justify-center">
<<<<<<< HEAD
                        {roleIcons[role]} <span className="ml-2 capitalize">{role}</span>
=======
                        {roleIcons[role]}{" "}
                        <span className="ml-2 capitalize">{role}</span>
>>>>>>> f626b8e (update permissions)
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            variants={itemVariants}
            onClick={handleAuth}
            disabled={!isFormValid || isLoading}
            className={`w-full py-3 text-white rounded-lg transition-all duration-300 ease-in-out ${
<<<<<<< HEAD
              isFormValid ? 'bg-primary hover:bg-primary-dark' : 'bg-gray-400 cursor-not-allowed'
=======
              isFormValid
                ? "bg-primary hover:bg-primary-dark"
                : "bg-gray-400 cursor-not-allowed"
>>>>>>> f626b8e (update permissions)
            }`}
            whileHover={isFormValid ? { scale: 1.05 } : {}}
            whileTap={isFormValid ? { scale: 0.95 } : {}}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-2 border-white rounded-full border-t-transparent"
              />
            ) : (
<<<<<<< HEAD
              <>{isSignUp ? 'Sign Up' : 'Log In'}</>
=======
              <>{isSignUp ? "Sign Up" : "Log In"}</>
>>>>>>> f626b8e (update permissions)
            )}
          </motion.button>

          <AnimatePresence mode="wait">
            {(error || successMessage) && (
              <motion.div
<<<<<<< HEAD
                key={error ? 'error' : 'success'}
=======
                key={error ? "error" : "success"}
>>>>>>> f626b8e (update permissions)
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`text-center p-2 rounded-lg ${
<<<<<<< HEAD
                  error ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
=======
                  error
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
>>>>>>> f626b8e (update permissions)
                }`}
              >
                {error || successMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;