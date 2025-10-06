export default function ProdcutsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      {/* Content section that follows the image */}
      {children}
    </div>
  );
}
