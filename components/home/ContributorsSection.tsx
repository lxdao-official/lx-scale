export function ContributorsSection() {
  return (
    <section className="py-16 border-b">
      <div className="container px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">贡献者</h2>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4 justify-items-center">
          {Array(24).fill(0).map((_, index) => (
            <div key={index} className="w-12 h-12 rounded-full border flex items-center justify-center">
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
