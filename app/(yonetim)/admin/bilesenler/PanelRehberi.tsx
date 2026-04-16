import type { CSSProperties } from 'react'

const kutuStili: CSSProperties = {
  background: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)',
  border: '1px solid rgba(148, 163, 184, 0.22)',
  borderRadius: '1.5rem',
  boxShadow: '0 18px 50px rgba(15, 23, 42, 0.07)',
  padding: '1.25rem',
}

export function PanelRehberi() {
  return (
    <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
      <div style={kutuStili}>
        <div style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.55rem' }}>
          Mebalci Yonetim Rehberi
        </div>
        <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
          Bu panelde her bolum belirli bir goreve hizmet eder. Icerik eklerken once Genel Ayarlar,
          sonra Katalog, sonra Portfoy/Kampanyalar ve en son Blog tarafini doldurmaniz en saglikli
          akis olur.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        }}
      >
        <div style={kutuStili}>
          <div style={{ color: '#0f172a', fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            1. Genel Ayarlar
          </div>
          <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>
            Site Ayarlari, Ust Bilgi, Alt Bilgi, Iletisim Bilgileri ve Ana Sayfa Icerigi burada
            yonetilir. Marka adi, footer metni, iletisim bilgisi, hero ve ana sayfa basliklari bu
            bolumlerden gelir.
          </p>
        </div>

        <div style={kutuStili}>
          <div style={{ color: '#0f172a', fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            2. Katalog ve Icerik
          </div>
          <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>
            Urunler ve Urun Kategorileri katalog sayfalarini besler. Portfoy Projeleri ve
            Kampanyalar ise detay sayfalariyla birlikte vitrinde gosterilir. Blog Yazilari SEO
            tarafinda organik trafigi destekler.
          </p>
        </div>

        <div style={kutuStili}>
          <div style={{ color: '#0f172a', fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            3. SEO ve Izleme
          </div>
          <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>
            Her icerikte SEO sekmesini doldurursaniz baslik, aciklama, canonical ve indeksleme
            tercihleri on yuze yansir. Entegrasyon Ayarlari ekranindan Search Console ve Google
            Analytics kimlikleri de panelden yonetilir.
          </p>
        </div>
      </div>
    </div>
  )
}
