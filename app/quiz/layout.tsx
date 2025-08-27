// app/quiz/layout.tsx
export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col items-center justify-center min-h-scree">
      {children}
    </section>
  );
}