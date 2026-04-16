import * as migration_20260415_181301_init_schema from './20260415_181301_init_schema';
import * as migration_20260416_133627_seo_ve_entegrasyon_ayarlari from './20260416_133627_seo_ve_entegrasyon_ayarlari';

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
];
