import { it, expect, describe } from 'vitest'
import { db } from './mocks/db'

describe('group', () => {
  it('should', async () => {
    const product = db.product.create()
    console.log(product)
    // const response = await fetch('/categories')
    // const data = await response.json()

    // console.log(data)
    // expect(data).toHaveLength(3)
  })
})
