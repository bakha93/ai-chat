type Props = {
  children: string | JSX.Element;
  onClick: () => void;
};

export const Button = ({ children, onClick }: Props) => {
  return (
    <div className='full'>
      <div onClick={onClick} className="cursor-pointer rounded-full py-2 px-4 bg-[#EAEDFF] font-normal text-sm button inline-flex">
        {children}
      </div>
    </div>
  );
};
