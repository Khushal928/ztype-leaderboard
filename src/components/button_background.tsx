interface ButtonBackgroundProps {
  name: string;
}

export default function ButtonBackground({ name }: ButtonBackgroundProps) {
  return (
    <div className="flex justify-center items-center bg-gradient-to-b from-[#161c2b] to-[#1d2845] w-fit text-white border-b-blue-400 px-4 py-2 rounded-lg shadow-md">
      {name}
    </div>
  );
}
