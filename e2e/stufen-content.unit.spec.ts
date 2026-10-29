import { expect, test } from '@playwright/test'
import { stageHref, stageOrder, stages } from '../src/content/stufen'
import { supportBlock } from '../src/content/stufen/shared'

test('stages are in path order and chained by next', () => {
  expect(stageOrder).toEqual(['vorschule', 'grundschule', 'mittelstufe', 'oberstufe', 'ganztag'])
  expect(stageOrder.map((id) => stages[id].next)).toEqual(['grundschule', 'mittelstufe', 'oberstufe', 'ganztag', undefined])
  expect(stageHref('oberstufe')).toBe('/oberstufe')
})

test('departments and colours match the site', () => {
  expect(stageOrder.map((id) => stages[id].department)).toEqual(['primarstufe', 'primarstufe', 'mittelstufe', 'oberstufe', undefined])
  expect(stageOrder.map((id) => stages[id].color)).toEqual(['golden', 'mint', 'accent', 'primary', 'surface-ink'])
})

test('career orientation only for Mittel- and Oberstufe', () => {
  expect(stageOrder.filter((id) => stages[id].careers)).toEqual(['mittelstufe', 'oberstufe'])
})

test('every stage has content for the tile and the page', () => {
  for (const id of stageOrder) {
    const s = stages[id]
    expect(s.teaser.length, id).toBeGreaterThan(20)
    expect(s.expect.length, id).toBeGreaterThanOrEqual(3)
    expect(s.photo.src, id).toMatch(/^\/images\/fotos\//)
  }
})

test('Beratung shows roles and contact, not a name list', () => {
  const text = JSON.stringify(supportBlock)
  expect(text).toContain('beratungsdienst@stuebenhofer-weg.de')
  expect(text).not.toMatch(/Krinke|Michalski|Zerbin/)
})

test('stage slugs are reserved for CMS pages', async () => {
  const { RESERVED } = await import('../src/lib/reserved-slugs')
  for (const s of ['vorschule', 'grundschule', 'mittelstufe', 'oberstufe', 'ganztag']) expect(RESERVED.has(s)).toBe(true)
})
