const InfinityLogo = ({ size = 32 }) => {
    return (
        <svg 
            width={size} 
            height={size / 2} 
            viewBox="0 0 100 50" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.3))' }}
        >
            <defs>
                <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--neuro-red)" />
                    <stop offset="25%" stopColor="var(--neuro-yellow)" />
                    <stop offset="50%" stopColor="var(--neuro-green)" />
                    <stop offset="75%" stopColor="var(--neuro-blue)" />
                    <stop offset="100%" stopColor="var(--neuro-purple)" />
                </linearGradient>
            </defs>
            <path 
                d="M25 10C10 10 10 40 25 40C35 40 45 30 55 20C65 10 75 10 85 10C100 10 100 40 85 40C75 40 65 30 55 20C45 10 35 10 25 10Z" 
                stroke="url(#rainbow)" 
                strokeWidth="8" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default InfinityLogo;
