type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {children}
    </div>
  );
}
