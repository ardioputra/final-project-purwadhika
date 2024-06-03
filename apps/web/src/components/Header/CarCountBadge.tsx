interface propsType {
  size: string;
}

const CarCountBadge: React.FC<propsType> = ({ size }) => {
  return (
    <div
      className={`absolute bg-[#0a6406] text-white text-[14px] ${size} -right-3 -top-1 rounded-full grid place-items-center`}
    >
      3
    </div>
  );
};

export default CarCountBadge;
