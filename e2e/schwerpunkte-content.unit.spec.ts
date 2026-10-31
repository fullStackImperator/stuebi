import { expect, test } from '@playwright/test'
import { schwerpunktOrder, schwerpunkte } from '../src/content/schwerpunkte'

test('Schwerpunkte are in page order with their site colours', () => {
  expect(schwerpunktOrder).toEqual(['sport', 'makerspace', 'abgekocht'])
  expect(schwerpunktOrder.map((id) => schwerpunkte[id].color)).toEqual(['accent', 'mint', 'golden'])
})

test('every Schwerpunkt has content for the card and the section', () => {
  for (const id of schwerpunktOrder) {
    const s = schwerpunkte[id]
    expect(s.id, id).toBe(id)
    expect(s.teaser.length, id).toBeGreaterThanOrEqual(40)
    expect(s.teaser.length, id).toBeLessThanOrEqual(260)
    expect(s.intro.length, id).toBeGreaterThan(40)
    expect(s.facts.length, id).toBeGreaterThanOrEqual(2)
    expect(s.facts.length, id).toBeLessThanOrEqual(3)
    expect(s.points.length, id).toBeGreaterThanOrEqual(4)
  }
})

test('facts carry the key numbers', () => {
  expect(schwerpunkte.sport.facts.map((f) => f.value).join(' ')).toContain('3 Std.')
  expect(schwerpunkte.abgekocht.facts.map((f) => f.value).join(' ')).toContain('Seit 2017')
})

test('Makerspace links its own website in a new tab', () => {
  expect(schwerpunkte.makerspace.links).toContainEqual(
    expect.objectContaining({ href: 'https://stuebi-makerspace.de/', external: true }),
  )
})

test('Abgekocht explains the week and the food', () => {
  const a = schwerpunkte.abgekocht
  expect(a.howItWorks?.length ?? 0).toBeGreaterThan(0)
  const text = JSON.stringify(a)
  expect(text).toContain('Mensaverein')
  expect(text).toContain('Halal')
})
