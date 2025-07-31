type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
  // <div className="max-w-5xl mx-auto px-6 py-10 font-sans text-black-900 bg-gray-50 min-h-screen">
    //  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4"> 
//<div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1] p-4 text-black-900">
//<div className="w-screen min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1] text-black-900">
   // <div className="w-full min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1] text-black-900 overflow-x-hidden">
    <div className ="fixed inset-0   /* fills the entire viewport */
                 overflow-x-hidden
                 bg-gradient-to-br from-[#f7c0b2] via-[#b2cbf7] to-[#f7efb2]
                 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900
                 text-black-900"
>
  {children}
    </div>
  );
}
