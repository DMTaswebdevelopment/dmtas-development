import AuthLayoutVariety from "../AuthLayoutVariety/AuthLayoutVariety";

export default function VarietyPuzzleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* {children} */}
      <AuthLayoutVariety>{children}</AuthLayoutVariety>
    </>
  );
}
