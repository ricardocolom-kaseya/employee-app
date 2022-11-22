import React from 'react'

export const useMousePosition = () => {
    const [mousePosition, setMousePosition] = React.useState({ x: null, y: null });

    React.useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return mousePosition;
};