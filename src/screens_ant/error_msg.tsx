import React, { FC } from 'react';
import Typography from '@mui/material/Typography';

interface InputQuestionProps {
  error_msg: string;
}

const MessageError: FC<InputQuestionProps> = ({ error_msg }) => {
  return (
    <p style={{ margin: '0px'}}>
      <Typography component="div" sx={{ flexGrow: 1, textAlign: 'center', fontSize: '13px', color: 'red' }}>
        {error_msg}
      </Typography>
    </p>
  );
};

export default MessageError;
