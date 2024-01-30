import { jsx as _jsx } from "react/jsx-runtime";
import { BallTriangle } from 'react-loader-spinner';
export const Loading = ({ size }) => {
    return (_jsx(BallTriangle, { height: size, width: size, radius: 5, color: "#41c48b", ariaLabel: "ball-triangle-loading", wrapperStyle: { marginBottom: '50px' }, wrapperClass: "", visible: true }));
};
