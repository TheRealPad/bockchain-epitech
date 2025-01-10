import { useState } from 'react';

interface LoginProps {
  login: (walletAddress: string) => void; // Fonction pour envoyer l'adresse du wallet à la page principale
}

const Login: React.FC<LoginProps> = ({ login }) => {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [generatedWallet, setGeneratedWallet] = useState<{ address: string; secret: string; public_key: string; private_key: string } | null>(null);

  // Fonction pour récupérer un wallet avec l'adresse via l'API backend
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!walletAddress) {
      setError('Please enter a wallet address.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/wallet/${walletAddress}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to retrieve wallet. Please check the address.');
      }

      const walletData = await response.json();
      console.log(walletData);
      login(walletData.account_data["Account"]); // Appelle la fonction login pour mettre à jour l'état dans la page principale
    } catch (err) {
      setError(err.message);
    }
  };

  // Fonction pour créer un nouveau wallet via l'API backend
  const handleCreateWallet = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: '',
      });

      if (!response.ok) {
        throw new Error('Failed to create a new wallet.');
      }

      const walletData = await response.json();
      console.log(walletData);
      setGeneratedWallet({
        address: walletData.account_data["Account"],
        secret: walletData.seed,
        public_key: walletData.public_key,
        private_key: walletData.private_key,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Connect or Create Wallet</h2>
        {error && <p style={styles.error}>{error}</p>}
        
        {/* Formulaire pour se connecter avec une adresse de wallet */}
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="walletAddress" style={styles.label}>Wallet Address</label>
            <input
              type="text"
              id="walletAddress"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              required
              style={styles.input}
              placeholder="Enter your XRPL wallet address"
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>

        <div style={styles.createWalletSection}>
          <p style={styles.orText}>Or</p>
          <button onClick={handleCreateWallet} style={styles.createWalletButton}>
            Create a New Wallet
          </button>

          {generatedWallet && (
            <div style={styles.generatedWalletInfo}>
              <p style={{color: 'black',}}><strong>Wallet Address:</strong> {generatedWallet.address}</p>
              <p style={{color: 'black',}}><strong>Secret:</strong> {generatedWallet.secret}</p>
              <p style={{color: 'black',}}><strong>Public Key:</strong> {generatedWallet.public_key}</p>
              <p style={{color: 'black',}}><strong>Private Key:</strong> {generatedWallet.private_key}</p>
              <p style={styles.warning}>⚠️ Save your secret key securely. It will not be shown again!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  formContainer: {
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center' as const,
    marginBottom: '1.5rem',
    fontSize: '1.8rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  label: {
    marginBottom: '0.5rem',
    display: 'block',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
    textAlign: 'center' as const,
  },
  createWalletSection: {
    marginTop: '2rem',
    textAlign: 'center' as const,
  },
  orText: {
    marginBottom: '1rem',
  },
  createWalletButton: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  generatedWalletInfo: {
    marginTop: '1.5rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    textAlign: 'left' as const,
  },
  warning: {
    marginTop: '0.5rem',
    color: 'red',
    fontSize: '0.9rem',
  },
};

export default Login;
