const PI_URL_KEY = 'pi_url'

export const getPiUrl = () => localStorage.getItem(PI_URL_KEY)
export const setPiUrl = (url: string) =>
  localStorage.setItem(PI_URL_KEY, url.replace(/\/$/, ''))

const baseHeaders = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true',
}

function requireUrl() {
  const url = getPiUrl()
  if (!url) throw new Error('URL no configurada')
  return url
}

export const getColor = async () => {
  const url = requireUrl()
  const res = await fetch(`${url}/color`, { headers: baseHeaders })
  if (!res.ok) throw new Error(`Error ${res.status}`)
  return res.json()
}

export const setColor = async (color: string) => {
  const url = requireUrl()
  const res = await fetch(`${url}/color`, {
    method: 'POST',
    headers: baseHeaders,
    body: JSON.stringify({ color }),
  })
  if (!res.ok) throw new Error(`Error ${res.status}`)
  return res.json()
}

export const setColorRgb = async (r: number, g: number, b: number) => {
  const url = requireUrl()
  const res = await fetch(`${url}/color/rgb`, {
    method: 'POST',
    headers: baseHeaders,
    body: JSON.stringify({ r, g, b }),
  })
  if (!res.ok) throw new Error(`Error ${res.status}`)
  return res.json()
}

export const turnOff = async () => {
  const url = requireUrl()
  const res = await fetch(`${url}/apagar`, {
    method: 'POST',
    headers: baseHeaders,
  })
  if (!res.ok) throw new Error(`Error ${res.status}`)
  return res.json()
}
