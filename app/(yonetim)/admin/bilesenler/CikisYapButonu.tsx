import Link from 'next/link'

export function CikisYapButonu() {
  return (
    <Link
      href="/admin/logout"
      style={{
        alignItems: 'center',
        background: '#0f172a',
        borderRadius: '999px',
        color: '#ffffff',
        cursor: 'pointer',
        display: 'inline-flex',
        fontSize: '0.9rem',
        fontWeight: 700,
        gap: '0.5rem',
        padding: '0.7rem 1rem',
        textDecoration: 'none',
        transition: 'opacity 180ms ease',
      }}
    >
      Çıkış Yap
    </Link>
  )
}
