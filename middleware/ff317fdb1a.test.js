const debug = require('debug')('final-mora0199-call0099:db')
const xss = require('xss')

const stripTags = (payload) => {
  if (typeof payload === 'string') {
    return xss(payload)
  } else if (Array.isArray(payload)) {
    return payload.map(item => stripTags(item))
  } else if (typeof payload === 'object') {
    const sanitizedPayload = {}
    for (let key in payload) {
      sanitizedPayload[key] = stripTags(payload[key])
    }
    return sanitizedPayload
  } else {
    return payload
  }
}

describe('stripTags', () => {
  test('should strip tags from string attributes', () => {
    const payload = { name: '<script>alert("xss")</script>' }
    const sanitizedPayload = stripTags(payload)
    expect(sanitizedPayload.name).toBe('alert("xss")')
  })

  test('should strip tags from array elements', () => {
    const payload = { names: ['<script>alert("xss")</script>', 'John'] }
    const sanitizedPayload = stripTags(payload)
    expect(sanitizedPayload.names).toEqual(['alert("xss")', 'John'])
  })

  test('should strip tags from nested objects', () => {
    const payload = { user: { name: '<script>alert("xss")</script>' } }
    const sanitizedPayload = stripTags(payload)
    expect(sanitizedPayload.user.name).toBe('alert("xss")')
  })

  test('should return the same value if there are no tags', () => {
    const payload = { name: 'John' }
    const sanitizedPayload = stripTags(payload)
    expect(sanitizedPayload).toEqual(payload)
  })
})
