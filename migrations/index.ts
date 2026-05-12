import * as migration_20260415_181301_init_schema from './20260415_181301_init_schema';
import * as migration_20260416_133627_seo_ve_entegrasyon_ayarlari from './20260416_133627_seo_ve_entegrasyon_ayarlari';
import * as migration_20260511_184900_atolyen_anasayfa_duzeni from './20260511_184900_atolyen_anasayfa_duzeni';
import * as migration_20260511_233300_iletisim_sol_gorsel from './20260511_233300_iletisim_sol_gorsel';
import * as migration_20260512_001500_site_baslik_fontu from './20260512_001500_site_baslik_fontu';
import * as migration_20260512_005500_site_baslik_fontu_serbest from './20260512_005500_site_baslik_fontu_serbest';
import * as migration_20260512_022000_portfoy_sayfa_baglantilari from './20260512_022000_portfoy_sayfa_baglantilari';
import * as migration_20260512_023000_sayfa_sag_reklam_alani from './20260512_023000_sayfa_sag_reklam_alani';
import * as migration_20260512_024000_site_baslik_font_linki from './20260512_024000_site_baslik_font_linki';

export const migrations = [
  {
    up: migration_20260415_181301_init_schema.up,
    down: migration_20260415_181301_init_schema.down,
    name: '20260415_181301_init_schema',
  },
  {
    up: migration_20260416_133627_seo_ve_entegrasyon_ayarlari.up,
    down: migration_20260416_133627_seo_ve_entegrasyon_ayarlari.down,
    name: '20260416_133627_seo_ve_entegrasyon_ayarlari'
  },
  {
    up: migration_20260511_184900_atolyen_anasayfa_duzeni.up,
    down: migration_20260511_184900_atolyen_anasayfa_duzeni.down,
    name: '20260511_184900_atolyen_anasayfa_duzeni'
  },
  {
    up: migration_20260511_233300_iletisim_sol_gorsel.up,
    down: migration_20260511_233300_iletisim_sol_gorsel.down,
    name: '20260511_233300_iletisim_sol_gorsel'
  },
  {
    up: migration_20260512_001500_site_baslik_fontu.up,
    down: migration_20260512_001500_site_baslik_fontu.down,
    name: '20260512_001500_site_baslik_fontu'
  },
  {
    up: migration_20260512_005500_site_baslik_fontu_serbest.up,
    down: migration_20260512_005500_site_baslik_fontu_serbest.down,
    name: '20260512_005500_site_baslik_fontu_serbest'
  },
  {
    up: migration_20260512_022000_portfoy_sayfa_baglantilari.up,
    down: migration_20260512_022000_portfoy_sayfa_baglantilari.down,
    name: '20260512_022000_portfoy_sayfa_baglantilari'
  },
  {
    up: migration_20260512_023000_sayfa_sag_reklam_alani.up,
    down: migration_20260512_023000_sayfa_sag_reklam_alani.down,
    name: '20260512_023000_sayfa_sag_reklam_alani'
  },
  {
    up: migration_20260512_024000_site_baslik_font_linki.up,
    down: migration_20260512_024000_site_baslik_font_linki.down,
    name: '20260512_024000_site_baslik_font_linki'
  },
];
