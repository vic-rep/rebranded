export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 700, color: 'var(--color-clarity-green)' }}>
        Trusti Prototypes
      </h1>
      <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-porcelain-white)', opacity: 0.7 }}>
        Add prototypes as routes under <code>/app/prototypes/</code>
      </p>
    </main>
  )
}
