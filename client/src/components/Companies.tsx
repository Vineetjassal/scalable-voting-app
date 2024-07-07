"use client";

import React from 'react';
import company from "../../public/company.png";
import Image from 'next/image';

const Companies: React.FC = () => {
  return (
    <section className="hidden md:block">
      <h1 className='text-7xl font-bold text-center'>Trusted by</h1>
      <h1 className='text-6xl font-bold text-center'>Developer Working in</h1>
      <div className='ml-[50px]'>
      <div className='flex justify-center'>
      <Image src={company} alt={''} className='mt-10'/>
      </div>
      </div>
    </section>
  );
};

export default Companies;
