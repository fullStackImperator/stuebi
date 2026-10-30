import { expect, test } from '@playwright/test'
import type { Field } from 'payload'
import { Pages } from '../src/collections/Pages'

// Finds the text field named "slug", also inside the row that slugField() returns.
function findSlugField(fields: Field[]): Extract<Field, { type: 'text' }> | undefined {
  for (const f of fields) {
    if (f.type === 'text' && f.name === 'slug') return f
    if ('fields' in f && Array.isArray(f.fields)) {
      const inner = findSlugField(f.fields as Field[])
      if (inner) return inner
    }
  }
}

test('CMS pages cannot take the slug of a stage page', async () => {
  const validate = findSlugField(Pages.fields)?.validate as ((v: string, o: unknown) => true | string) | undefined
  expect(validate, 'slug field has a validate function').toBeDefined()
  expect(await validate!('ganztag', {})).toContain('reserviert')
  expect(await validate!('vorschule', {})).toContain('reserviert')
  expect(await validate!('elternabend', {})).toBe(true)
})
