import './App.css';
import ChatFrame from '../components/chat-frame/chat-frame';
import HistoryFrame from '../components/history-frame/history-frame';

export default function App() {
  return (
    <div className="main">
      <div className="history">
        <HistoryFrame />
      </div>
      <div className="chat">
        <ChatFrame />
      </div>
    </div>
  );
}
