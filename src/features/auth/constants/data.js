export const DEFAULT_DATA = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    dateOfBirth: '',
};
export const STYLES_BUTTON = {
    mx: 'auto',
    display: 'block',
    mb: 2,
    mt: 2,
    color: 'white',
    bgcolor: 'red',
    '&:hover': {
        bgcolor: 'red',
        opacity: [0.9, 0.8, 0.7],
    }
};
export const REDIRECT_TIME = 5000;
export const STYLES_PROGRES_BAR = {
    root: {
        width: 100,
        height: 100,
    },
    path: {
        stroke: `#41c48b`,
        strokeLinecap: 'butt',
        transition: 'stroke-dashoffset 0.5s ease 0s',
    },
    trail: {
        stroke: '#d6d6d6',
        strokeLinecap: 'butt',
    },
    text: {
        fill: 'black',
        fontSize: '16px',
    },
    background: {
        fill: '#41c48b',
    },
};
export const DEFAULT_DATA_LOGIN = {
    email: '',
    password: '',
};
