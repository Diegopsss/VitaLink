let masterVolume = 1.0

export const getMasterVolume = () => masterVolume
export const setMasterVolume = (v: number) => {
  masterVolume = Math.max(0, Math.min(1, v))
}
