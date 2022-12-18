import { Primitives } from "../types/index"

export const copyArrayShallow = <T extends Record<string, Primitives>>(array: T[]) => {
  return array.map(i => ({ ...i }))
}

export const shuffleArray = <T>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
