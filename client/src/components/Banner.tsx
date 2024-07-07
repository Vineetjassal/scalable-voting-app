"use client";

import React from 'react';
import screenshot from "../../public/ssofgithub.png";
import Image from 'next/image';

const Banner: React.FC = () => {
  return (
    <section className="relative py-6 px-3 md:px-40 md:py-0 mt-20">
      <div className="relative bg-black text-white flex flex-col md:flex-row items-center justify-between p-8 rounded-3xl min-h-[450px] overflow-hidden">
        <div className="relative z-10 mb-8 md:mb-0 md:ml-8">
          <h1 className="md:text-6xl text-5xl font-semibold">
            We're <span className="line-through">closed</span> open <br /> source!
          </h1>
          <p className="mt-4 md:text-xl text-lg text-gray-400">
            We're working on a new version of our platform, expect <br className='hidden md:block'/> new features  and improvements soon!   Join the community <br className='hidden md:block'/> for updates.
          </p>
          <div className="mt-[60px]">
            <a
              href="https://github.com/Vineetjassal/scalable-voting-app"
              className="bg-white font-semibold text-black px-6 py-3 rounded mr-2 md:text-xl text-md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source Code
            </a>
            <a
              href="https://www.linkedin.com/in/vineetjassal/"
              className="bg-white md:text-xl text-md font-semibold text-black px-6 py-3 rounded md:ml-4 ml-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Updates
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-[75%] h-[75%] md:w-[45%] md:h-[72%] hidden md:block">
          <Image src={screenshot} alt="GitHub Screenshot" layout="fill" objectFit="cover" className="rounded" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
