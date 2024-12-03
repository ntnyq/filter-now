/**
 * Filter types
 */
export type FilterType =
  | 'blur'
  | 'brightness'
  | 'contrast'
  | 'grayscale'
  | 'hue-rotate'
  | 'invert'
  | 'opacity'
  | 'saturate'
  | 'sepia'

/**
 * @file Copied from `type-fest`
 */
export type JsonArray = JsonValue[] | readonly JsonValue[]
export type JsonObject = { [Key in string]: JsonValue } & {
  [Key in string]?: JsonValue | undefined
}
export type JsonPrimitive = boolean | null | number | string
export type JsonValue = JsonArray | JsonObject | JsonPrimitive
