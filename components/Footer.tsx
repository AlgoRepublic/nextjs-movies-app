import React from 'react';
import Image from 'next/image';
import FooterImage from '../public/footer.png';

const Footer = () => {
  return (
    <footer className='w-full'>
      <Image
        src={FooterImage}
        alt=''
        className='w-full'
        width={1000}
        height={400}
      />
    </footer>
  );
};

export default Footer;
