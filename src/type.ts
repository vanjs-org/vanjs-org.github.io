import type { ChildDom as TypeChildDom, VanObj as PVanObj } from "mini-van-plate";
export type { JSDOM } from "jsdom"

export type VanObj = PVanObj<HTMLElement, Text>
export type VanParam = Parameters<VanObj['tags']['']>[1]
export type VanReturn = ReturnType<VanObj['tags']['']>
export type JsFiddle = {
  id: string,
  code?: string,
  'data-prefix'?: string,
  'data-replace-code'?: string,
  'data-suffix'?: string,
  'data-details'?: string,
  'data-css'?: string,
  "data-css-file"?: string
}