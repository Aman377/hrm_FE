export default function CardCustom({ children, title, extra }) {
  return (
    <div className='p-2 border rounded-lg bg-white dark:bg-[#1C1B20] mt-2'>
      <div className='flex justify-between py-2'>
        <h1 className='text-xl font-bold px-2'>{title}</h1>
        <div className='flex gap-2 items-center'>{extra}</div>
      </div>
      {children}
    </div>
  );
}
