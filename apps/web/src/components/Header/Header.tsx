import Image from 'next/image';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import { FaBasketShopping } from 'react-icons/fa6';
import CarCountBadge from './CarCountBadge';
import SearchBar from './SearchBar';
import Container from '../Container';

export const Header = () => {
  return (
    <div className="sticky top-0 w-full bg-white z-30 shadow-sm ">
      <div className="py-2 border-b-[1px]">
        <Container>
          <div className="flex justify-between items-center pt-5 py-5">
            <Link href="/">
              <Image src="/logo.png" alt="logo" width={150} height={100} />
            </Link>
            <div className="hidden md:block w-full max-w-[600px]">
              <SearchBar />
            </div>
            <div className="flex gap-4">
              <div className="icon__wrapper relative">
                <FaBasketShopping />
                <CarCountBadge size="w-[25px] h-[25px]" />
              </div>
              <div className="icon__wrapper">
                <AiOutlineUser />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};
