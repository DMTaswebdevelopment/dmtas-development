export default function PrivacyLayout({
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
