import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

const LoginPage = () => {
  const { loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  React.useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <AnimatedBackground />
      <div className="login-card">
        <div className="login-header">
          <div className="logo-placeholder">
            <img src="/favicon.png" alt="Manual de Programación" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
          </div>
          <h1>Manual de Programación</h1>

          <p>Aprende, domina y documenta tu camino como desarrollador.</p>
        </div>
        
        <button onClick={handleLogin} className="google-login-btn">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
          <span>Continuar con Google</span>
        </button>
        
        <div className="login-footer">
          <p>Accede para guardar tu progreso en cada manual.</p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .login-container {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: transparent;
          color: white;
          padding: 20px;
          font-family: 'IBM Plex Mono', monospace;
        }

        .login-card {
          position: relative;
          z-index: 2;
          background: rgba(13, 25, 42, 0.55);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 48px;
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.05);
          width: 100%;
          max-width: 440px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.12);
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .login-header h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 24px 0 12px;
          background: linear-gradient(to right, #60a5fa, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .login-header p {
          color: #94a3b8;
          font-size: 1.1rem;
          margin-bottom: 40px;
          line-height: 1.5;
        }

        .logo-placeholder {
          width: 80px;
          height: 80px;
          background: rgba(96, 165, 250, 0.1);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          color: #60a5fa;
        }

        .logo-placeholder svg {
          width: 40px;
          height: 40px;
        }

        .google-login-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          padding: 14px;
          background: white;
          color: #1e293b;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 24px;
        }

        .google-login-btn:hover {
          background: #f1f5f9;
          transform: translateY(-2px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .google-login-btn img {
          width: 24px;
          height: 24px;
        }

        .login-footer p {
          color: #64748b;
          font-size: 0.9rem;
        }
      `}} />
    </div>
  );
};

export default LoginPage;
