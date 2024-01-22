import { BallTriangle } from 'react-loader-spinner';

export const Loading = ({size}: {size: number}) => {
    return(
        <BallTriangle
        height={size}
        width={size}
        radius={5}
        color="#41c48b"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{marginBottom: '50px'}}
        wrapperClass=""
        visible={true}
      />
    )
}