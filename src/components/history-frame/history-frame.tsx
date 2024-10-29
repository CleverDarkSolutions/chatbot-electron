import './history-frame.css';
import { Paper } from '@mui/material';

function HistoryFrame() {
  return (
    <Paper>
      <div className="history-title">History</div>
      <div className="history-chats" />
    </Paper>
  );
}

export default HistoryFrame;
