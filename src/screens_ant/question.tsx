import React, { FC } from 'react';
import Typography from '@mui/material/Typography';

interface InputQuestionProps {
  question: string;
}

const InputQuestion: FC<InputQuestionProps> = ({ question }) => {
  return (
    <p>
      <Typography component="div" sx={{ flexGrow: 1, textAlign: 'center', fontSize: '18px' }}>
        {question}
      </Typography>
    </p>
  );
};

export default InputQuestion;
