import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
    startOnLoad: true,
    theme: 'dark',
    securityLevel: 'loose',
    fontFamily: 'var(--font-sans)',
});

interface MermaidProps {
    chart: string;
}

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            mermaid.contentLoaded();
            const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

            try {
                mermaid.render(id, chart).then(({ svg }) => {
                    if (ref.current) {
                        ref.current.innerHTML = svg;
                    }
                });
            } catch (error) {
                console.error('Mermaid render error:', error);
            }
        }
    }, [chart]);

    return (
        <div className="flex justify-center my-4 overflow-x-auto">
            <div ref={ref} className="mermaid-chart" />
        </div>
    );
};

export default Mermaid;
