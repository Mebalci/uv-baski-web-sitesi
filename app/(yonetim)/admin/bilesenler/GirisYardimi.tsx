export function GirisYardimi() {
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,0.96) 100%)',
        border: '1px solid rgba(148, 163, 184, 0.26)',
        borderRadius: '1.25rem',
        boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)',
        marginBottom: '1.5rem',
        maxWidth: '34rem',
        padding: '1.25rem 1.25rem 1.1rem',
      }}
    >
      <div
        style={{
          color: '#0f172a',
          fontSize: '1.15rem',
          fontWeight: 800,
          marginBottom: '0.55rem',
        }}
      >
        Mebalci Yönetim
      </div>
      <p
        style={{
          color: '#475569',
          fontSize: '0.92rem',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        Bu panel üzerinden ürünleri, kampanyaları, portföy projelerini ve ana sayfa
        içeriklerini yönetebilirsiniz. Şifre sıfırlama bağlantısı e-posta ile gönderilir.
      </p>
      <p
        style={{
          color: '#92400e',
          fontSize: '0.85rem',
          fontWeight: 600,
          lineHeight: 1.55,
          margin: '0.75rem 0 0',
        }}
      >
        Geliştirme ortamında Resend ayarlı değilse şifre sıfırlama bağlantısı gerçek
        e-posta olarak gitmez; sunucu terminaline yazdırılır.
      </p>
    </div>
  )
}
