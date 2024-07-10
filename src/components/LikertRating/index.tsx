import * as React from 'react';
import { styled } from '@mui/material/styles';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import Sentiment1 from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';
import Sentiment2 from '@mui/icons-material/SentimentVeryDissatisfied';
import Sentiment3 from '@mui/icons-material/SentimentNeutral';
import Sentiment4 from '@mui/icons-material/SentimentSatisfiedAlt';
import Sentiment5 from '@mui/icons-material/SentimentVerySatisfied';

const customIcons: {
    [index: string]: {
        icon: React.ReactElement;
        label: string;
    };
} = {
    1: {
        icon: <Sentiment1 htmlColor="#E53935" />,
        label: 'Very Dissatisfied',
    },
    2: {
        icon: <Sentiment2 htmlColor="#E57373" />,
        label: 'Dissatisfied',
    },
    3: {
        icon: <Sentiment3 htmlColor="#eedc68" />,
        label: 'Neutral',
    },
    4: {
        icon: <Sentiment4 htmlColor="#81C784" />,
        label: 'Satisfied',
    },
    5: {
        icon: <Sentiment5 htmlColor="#43A047" />,
        label: 'Very Satisfied',
    },
};

function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
        color: theme.palette.action.disabled,
    },
}));

export default function LikertRating(props: any) {
    const [value, setValue] = React.useState(props.value ? props.value : 3);
    const { valueChosen, onChange } = props; // Extraia onChange das props
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
        if (newValue !== null) {
            onChange(newValue); // Chama a função fornecida pelo componente pai
        }
    };

    return (
        <StyledRating
            name="highlight-selected-only"
            value={valueChosen}
            // value={value}
            onChange={handleChange} // Use handleChange aqui
            // onChange={(event, newValue) => {
            //     setValue(newValue!);
            // }}
            IconContainerComponent={IconContainer}
            getLabelText={(value: number) => customIcons[value].label}
            highlightSelectedOnly
        />
    );
}