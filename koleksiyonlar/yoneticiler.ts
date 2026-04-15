import { superAdminMi } from '@/payload/erisim'
import type { CollectionConfig } from 'payload'

const yonetimErisimi: NonNullable<CollectionConfig['access']>['admin'] = ({ req }) => {
  if (!req.user || typeof req.user !== 'object') {
    return false
  }

  const rol = 'rol' in req.user ? req.user.rol : null
  return rol === 'super_admin' || rol === 'editor'
}

export const Yoneticiler: CollectionConfig = {
  access: {
    admin: yonetimErisimi,
    create: superAdminMi,
    delete: superAdminMi,
    read: yonetimErisimi,
    update: superAdminMi,
  },
  admin: {
    defaultColumns: ['ad', 'eposta', 'rol'],
    group: 'Sistem',
    useAsTitle: 'ad',
  },
  auth: {
    forgotPassword: {
      expiration: 1000 * 60 * 60,
      generateEmailHTML: (args) => {
        const token = args?.token
        const user = args?.user
        const siteUrl = process.env.SITE_URL || 'http://localhost:3000'
        const resetUrl = `${siteUrl}/admin/reset/${token || ''}`
        const ad =
          user && typeof user === 'object' && 'ad' in user ? String(user.ad || '') : 'Merhaba'

        return `
          <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:24px; color:#0f172a;">
            <div style="max-width:560px; margin:0 auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:20px; padding:32px;">
              <img src="${siteUrl}/marka/mebalci-logo.png" alt="Mebalci" style="width:72px; height:72px; object-fit:cover; border-radius:16px; display:block; margin-bottom:20px;" />
              <h1 style="font-size:24px; margin:0 0 12px;">Mebalci Yönetim Şifre Sıfırlama</h1>
              <p style="font-size:15px; line-height:1.7; color:#334155; margin:0 0 18px;">
                ${ad}, yönetim paneli şifrenizi yenilemek için aşağıdaki butonu kullanabilirsiniz.
              </p>
              <a href="${resetUrl}" style="display:inline-block; background:#0f172a; color:#ffffff; text-decoration:none; padding:14px 18px; border-radius:999px; font-weight:700;">
                Şifremi Yenile
              </a>
              <p style="font-size:13px; line-height:1.7; color:#64748b; margin:20px 0 0;">
                Bu işlem size ait değilse e-postayı yok sayabilirsiniz. Bağlantı 1 saat boyunca geçerlidir.
              </p>
              <p style="font-size:12px; line-height:1.6; color:#94a3b8; margin:16px 0 0;">
                Buton çalışmazsa bu adresi tarayıcıya yapıştırın:<br />${resetUrl}
              </p>
            </div>
          </div>
        `
      },
      generateEmailSubject: () => 'Mebalci Yönetim şifre sıfırlama bağlantınız',
    },
  },
  labels: {
    plural: 'Yöneticiler',
    singular: 'Yönetici',
  },
  fields: [
    {
      admin: {
        description: 'Yönetici listesinde ve hesap ekranında görünen ad soyad bilgisidir.',
      },
      label: 'Ad Soyad',
      name: 'ad',
      required: true,
      type: 'text',
    },
    {
      defaultValue: 'editor',
      admin: {
        description:
          'Süper Admin tüm yönetici işlemlerini yapabilir. Editör içerik yönetebilir ancak yönetici hesaplarını değiştiremez.',
      },
      label: 'Rol',
      name: 'rol',
      options: [
        {
          label: 'Süper Admin',
          value: 'super_admin',
        },
        {
          label: 'Editör',
          value: 'editor',
        },
      ],
      required: true,
      type: 'select',
    },
  ],
  slug: 'yoneticiler',
}
