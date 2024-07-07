"use client";

import React, { useState } from 'react';
import { SiReact, SiNextdotjs, SiTailwindcss, SiTypescript, SiShadcnui } from 'react-icons/si';

const technologies = [
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'React', icon: SiReact },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Shadcn UI', icon: SiShadcnui }, // Replace with appropriate icon
  { name: 'TypeScript', icon: SiTypescript },
];

const TechnologyDisplay: React.FC = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <div className="text-center mb-[120px]">
      <h1 className="sm:text-5xl text-3xl font-bold">Built for developers</h1>
      <p className="text-gray-700 md:text-lg text-md my-6">
        No need to learn new mental models and frameworks. Scalable Voting App works <br /> with the frontend technologies that developers are most familiar with.
      </p>
      <div className="grid grid-cols-3 gap-6 justify-items-center md:flex md:justify-center">
        {technologies.map((tech) => (
          <div
            key={tech.name}
            onMouseEnter={() => setHoveredTech(tech.name)}
            onMouseLeave={() => setHoveredTech(null)}
            className="cursor-pointer text-center"
          >
            <tech.icon className="text-black h-20 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnologyDisplay;

