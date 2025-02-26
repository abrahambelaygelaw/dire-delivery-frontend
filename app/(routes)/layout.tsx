import BaseLayout from "@/components/shared/layout/base-layout";

export default function RouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BaseLayout>{children}</BaseLayout>
  );
}
