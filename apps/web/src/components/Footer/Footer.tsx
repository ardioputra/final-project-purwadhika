import Link from 'next/link';
import FooterList from './FooterList';
import { MdFacebook } from 'react-icons/md';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { BsInstagram, BsYoutube } from 'react-icons/bs';
import Container from '../Container';

export const Footer = () => {
  return (
    <footer className=" bg-[#0a6406] text-slate-200 text-sm mt-16 ">
      <Container>
        <div className="container flex flex-col md:flex-row justify-between pt-16 pb-8">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb=2">About Us</h3>
            <h2 className="mb-2">
              Cheery fresh, the leading supermarket chain store specializing in
              fresh fruits and vegetables, both from locally grown market and
              the best fruit varieties from around the world. With fresh fruit,
              vegetables, meat, and thousands of other items available at the
              tap of a button, grocery shopping has never been easier.
            </h2>
            <h2>
              &copy; {new Date().getFullYear()} Cheery fresh. All rights
              reserved
            </h2>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb=2">Customer Service</h3>
            <Link href={'#'}>Contact Us</Link>
            <Link href={'#'}>Terms & Condition</Link>
            <Link href={'#'}>Payment Confirmation</Link>
            <Link href={'#'}>FAQs</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb=2">Product Categories</h3>
            <Link href={'#'}>Vegetables</Link>
            <Link href={'#'}>Fruits</Link>
          </FooterList>

          <FooterList>
            <h3 className="text-base font-bold mb=2">Follow Us</h3>
            <div className="flex gap-2">
              <Link href={'#'}>
                <MdFacebook size={24} />
              </Link>
              <Link href={'#'}>
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href={'#'}>
                <BsYoutube size={24} />
              </Link>
              <Link href={'#'}>
                <BsInstagram size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};
