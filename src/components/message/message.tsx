import './message.css';
import { Box } from '@mui/material';

export type MessageProps = {
  type: 'self' | 'received';
  message: string;
  date: string;
};

function Message(props: MessageProps) {
  const { type, message, date } = props;
  return (
    <Box
      className={
        type === 'self'
          ? 'message-container color-user'
          : 'message-container color-bot'
      }
    >
      {/* <div>{type}</div> */}
      <div>{message}</div>
      {/* <div>{date}</div> */}
    </Box>
  );
}

export default Message;
