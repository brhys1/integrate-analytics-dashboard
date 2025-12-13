'use client'

import { useEffect, useRef } from 'react';

interface TableauEmbedProps {
  src: string;
  width?: string;
  height?: string;
}

export default function TableauEmbed({ src, width = "100%", height = "600px" }: TableauEmbedProps) {
  const vizRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadViz = async () => {
      if (vizRef.current && typeof window !== 'undefined') {
        // Clear any existing content
        vizRef.current.innerHTML = '';

        // Dynamically import the Tableau Embedding API
        const { TableauViz } = await import('@tableau/embedding-api');

        const viz = new TableauViz();
        viz.src = src;
        viz.width = width;
        viz.height = height;
        viz.hideTabs = true;

        try {
          vizRef.current.appendChild(viz);
        } catch (error) {
          console.error('Error loading Tableau viz:', error);
        }
      }
    };

    loadViz();
  }, [src, width, height]);

  return <div ref={vizRef} className="rounded-xl overflow-hidden shadow-sm border border-gray-200 min-h-[600px]" />;
}
