export function MebalciLogo() {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        gap: '1.2rem',
      }}
    >
      <img
        alt="Mebalci logosu"
        src="/marka/mebalci-logo.png"
        style={{
          borderRadius: '1.25rem',
          boxShadow: '0 18px 40px rgba(15, 23, 42, 0.18)',
          height: '5.25rem',
          objectFit: 'cover',
          width: '5.25rem',
        }}
      />
      <div style={{ display: 'grid', gap: '0.25rem' }}>
        <strong
          style={{
            color: '#0f172a',
            fontSize: '2rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
          }}
        >
          Mebalci
        </strong>
        <span
          style={{
            color: '#475569',
            fontSize: '1rem',
            fontWeight: 500,
            lineHeight: 1.2,
          }}
        >
          Yönetim Paneli
        </span>
      </div>
    </div>
  )
}
