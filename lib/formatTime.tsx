const formatTime = (date: Date) => {
  let y = date.getFullYear().toString()
  let m = (date.getMonth() + 1).toString()
  let d = date.getDay().toString()
  let h = date.getHours().toString()
  let min = date.getMinutes().toString()
  let s = date.getSeconds().toString()
  m = m.length === 1 ? '0' + m : m
  d = d.length === 1 ? '0' + d : d
  h = h.length === 1 ? '0' + h : h
  min = min.length === 1 ? '0' + min : min
  s = s.length === 1 ? '0' + s : s
  return `${y}-${m}-${d} ${h}:${min}:${s}`
}

export default formatTime
