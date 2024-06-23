import { useState, useEffect } from 'react';


interface WindowScrollState {
	x: number;
	y: number;
}

export default function useWindowScroll(): [WindowScrollState, (position: { x?: number; y?: number; behavior?: ScrollBehavior }) => void] {
	const [scroll, setScroll] = useState<WindowScrollState>({
		x: typeof window !== 'undefined' ? window.scrollX : 0,
		y: typeof window !== 'undefined' ? window.scrollY : 0,
	});

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const handleScroll = () => {
				setScroll({
					x: window.scrollX,
					y: window.scrollY,
				});
			};

			window.addEventListener('scroll', handleScroll);
			return () => window.removeEventListener('scroll', handleScroll);
		}
	}, []);

	const scrollTo = (position: { x?: number; y?: number; behavior?: ScrollBehavior }) => {
		window.scrollTo({
			left: position.x ?? scroll.x,
			top: position.y ?? scroll.y,
			behavior: position.behavior ?? 'auto',
		});
	};

	return [scroll, scrollTo];
}