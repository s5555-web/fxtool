export const defaults={separators:['.','。',',','，','、',' ','/','-'],markers:['各','每','每个','各个']}
const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')
export function parse(text,settings=defaults){
 const markers=settings.markers.filter(Boolean).sort((a,b)=>b.length-a.length)
 const separators=settings.separators.filter(Boolean).sort((a,b)=>b.length-a.length)
 if(!markers.length||!separators.length)throw Error('连接符和金额分隔词不能为空')
 const pattern=new RegExp(`^(.+?)(${markers.map(escape).join('|')})\\s*(\\d+(?:\\.\\d{1,2})?)\\s*$`)
 const split=new RegExp(separators.map(escape).join('|'))
 return text.split(/\r?\n/).map(s=>s.trim()).filter(Boolean).map((line,index)=>{
 const match=line.match(pattern);if(!match)throw Error(`第 ${index+1} 行格式不正确，请输入如 12.23.32各50`)
 const items=match[1].split(split).map(s=>s.trim()).filter(Boolean)
 if(!items.length||items.some(s=>!/^\d+$/.test(s)))throw Error(`第 ${index+1} 行包含无效号码`)
 const cents=Math.round(Number(match[3])*100)
 if(!Number.isSafeInteger(cents)||!Number.isSafeInteger(cents*items.length))throw Error('金额过大')
 return {source:line,items,cents,total:cents*items.length}
 })
}
