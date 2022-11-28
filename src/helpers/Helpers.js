import React from 'react'

export const font1 = "Inter"

export function randomInt(max) {
    return Math.floor(Math.random() * max)
}

export function getToken() {
    return localStorage.getItem('token')
}

export function getAge(dob) {
    const today = new Date();

    const currAge = (today - dob) / 31536000000;
    return Math.floor(currAge);
}

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

export const clamp = (num, min, max) => {
    return Math.min(Math.max(num, min), max)
}