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
  | 'saturate'
  | 'sepia'
  | 'opacity'

/**
 * @file Copied from `type-fest`
 */
export type JsonPrimitive = string | number | boolean | null
export type JsonObject = { [Key in string]: JsonValue } & {
  [Key in string]?: JsonValue | undefined
}
export type JsonArray = JsonValue[] | readonly JsonValue[]
export type JsonValue = JsonPrimitive | JsonObject | JsonArray
