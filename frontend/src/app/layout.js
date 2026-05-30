import "./globals.css";

export const metadata = {
  title: "Task Manager Hub — Premium Task Management Workspace",
  description: "Manage, track, and optimize your project pipelines with a sleek production-ready dashboard interface.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
