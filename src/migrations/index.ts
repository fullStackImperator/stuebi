import * as migration_20261022_181908_baseline from './20261022_181908_baseline';
import * as migration_20261022_181917_departments from './20261022_181917_departments';
import * as migration_20261024_211102_page_images from './20261024_211102_page_images';
import * as migration_20261029_205657_zielgruppe from './20261029_205657_zielgruppe';

export const migrations = [
  {
    up: migration_20261022_181908_baseline.up,
    down: migration_20261022_181908_baseline.down,
    name: '20261022_181908_baseline',
  },
  {
    up: migration_20261022_181917_departments.up,
    down: migration_20261022_181917_departments.down,
    name: '20261022_181917_departments',
  },
  {
    up: migration_20261024_211102_page_images.up,
    down: migration_20261024_211102_page_images.down,
    name: '20261024_211102_page_images',
  },
  {
    up: migration_20261029_205657_zielgruppe.up,
    down: migration_20261029_205657_zielgruppe.down,
    name: '20261029_205657_zielgruppe'
  },
];
