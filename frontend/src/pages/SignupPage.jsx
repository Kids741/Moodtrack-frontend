import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  Label } from "@/components/ui/label";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { 
  User, 
  Shield, 
  Users, 
  Stethoscope,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle 
} from "lucide-react";
import api from "@/utils/axios";

const ROLE_OPTIONS = [
  { 
    value: "client", 
    label: "Client", 
    description: "Track your personal mood & journal",
    icon: User,
    color: "from-blue-500 to-indigo-500"
  },
  { 
    value: "therapist", 
    label: "Therapist", 
    description: "Manage client progress & insights",
    icon: Stethoscope,
    color: "from-emerald-500 to-teal-500"
  },
];

export default function SignupPage() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    role: "client" 
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hoveredRole, setHoveredRole] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    // Clear error on input
    if (message.type === "error") setMessage({ text: "", type: "" });
  };

  const handleRoleSelect = (role) => {
    setForm({ ...form, role: role.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await api.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      setMessage({ 
        text: "Welcome to MoodTrack! Redirecting to your dashboard...", 
        type: "success" 
      });
      
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } catch (err) {
      if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        const errorMessages = err.response.data.errors.map(e => e.msg).join(". ");
        setMessage({ text: errorMessages, type: "error" });
      } else {
        setMessage({ 
          text: err.response?.data?.message || "Registration failed. Please try again.", 
          type: "error" 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-pink-300/30 to-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-300/30 to-indigo-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-xl relative z-10 border-white/50">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Join MoodTrack
            </CardTitle>
            <p className="text-gray-600 text-sm mt-2">Create your account to start your mental wellness journey</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Role Selection */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold flex items-center gap-2 text-gray-800">
              <Users className="w-5 h-5 text-blue-500" />
              Choose your role
            </Label>
            <div className="grid grid-cols-1 gap-3">
              {ROLE_OPTIONS.map((roleOption) => {
                const Icon = roleOption.icon;
                const isSelected = form.role === roleOption.value;
                return (
                  <button
                    key={roleOption.value}
                    type="button"
                    onClick={() => handleRoleSelect(roleOption)}
                    onMouseEnter={() => setHoveredRole(roleOption.value)}
                    onMouseLeave={() => setHoveredRole(null)}
                    className={`group p-4 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      isSelected
                        ? "bg-gradient-to-r " + roleOption.color + " border-transparent shadow-2xl ring-4 ring-white/50"
                        : hoveredRole === roleOption.value
                        ? "border-indigo-300 bg-indigo-50/50 shadow-lg scale-[1.02]"
                        : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                        isSelected ? "bg-white/20 backdrop-blur-sm" : "bg-white/50"
                      }`}>
                        <Icon className={`w-6 h-6 ${isSelected ? "text-white drop-shadow-lg" : "text-gray-700"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            isSelected ? "bg-white/20 text-white" : "bg-gray-200 text-gray-800"
                          }`}>
                            {roleOption.label}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 group-hover:text-gray-800 line-clamp-2">
                          {roleOption.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2 font-medium text-gray-800">
                <span className="w-4 h-4 text-indigo-500">*</span>
                Full Name
              </Label>
              <Input 
                id="name" 
                type="text" 
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className="h-12 rounded-2xl border-gray-200 focus:ring-4 focus:ring-indigo-500/20"
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 font-medium text-gray-800">
                <span className="w-4 h-4 text-indigo-500">*</span>
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="h-12 pl-10 rounded-2xl border-gray-200 focus:ring-4 focus:ring-indigo-500/20"
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2 font-medium text-gray-800">
                <span className="w-4 h-4 text-indigo-500">*</span>
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={handleChange}
                  className="h-12 pl-10 pr-12 rounded-2xl border-gray-200 focus:ring-4 focus:ring-indigo-500/20 flex w-full border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  style={{ WebkitTextSecurity: showPassword ? 'none' : 'disc' }}
                  autoComplete="new-password"
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors z-10"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {message.text && (
              <div className={`p-4 rounded-2xl text-sm text-center font-medium shadow-lg transition-all ${
                message.type === "success"
                  ? "bg-emerald-100 border-2 border-emerald-200 text-emerald-800"
                  : "bg-red-100 border-2 border-red-200 text-red-800"
              }`}>
                <AlertCircle className={`w-4 h-4 inline mr-2 ${message.type === "success" ? "text-emerald-600" : "text-red-600"}`} />
                {message.text}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading || !form.name || !form.email || !form.password}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="pt-6 pb-8 px-6">
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors">
              Sign in here
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
