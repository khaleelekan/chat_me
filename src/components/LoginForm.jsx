 import { useState } from 'react';
import axios from 'axios';

const projectID = 'a6decea1-f9c9-40eb-b060-10f2ffdb38c5';

const Modal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = { 
      'Project-ID': projectID, 
      'User-Name': username, 
      'User-Secret': password 
    };

    setLoading(true); // Set loading to true when starting the request
    setError(''); // Reset any previous error

    try {
      await axios.get('https://api.chatengine.io/chats', { headers: authObject });

      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      window.location.reload(); // Reload to show the chat interface
    } catch (error) {
      setError('Oops, incorrect credentials or network issue.'); 
    } finally {
      setLoading(false); // Stop loading when the request finishes
    }
  };

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chat Application</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="input" 
            placeholder="Username" 
            required 
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="input" 
            placeholder="Password" 
            required 
          />
          <div align ="center">
            <button type="submit" className="button" disabled={loading}>
              <span>{loading ? 'Logging in...' : 'Log In'}</span>
            </button>
          </div>
        </form>
        {error && <h1 style={{ color: 'red' }}>{error}</h1>} {/* Display error in red */}
      </div>
    </div>
  );
};

export default Modal;
