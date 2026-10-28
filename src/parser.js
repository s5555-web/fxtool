export const defaults={separators:[',','.','-','=','、'],markers:['各','各数','个','皆','全']}
export function upgradeSettings(settings){
 const legacy={separators:['.','。',',','，','、',' ','/','-'],markers:['各','每','每个','各个']}
 if(JSON.stringify(settings)===JSON.stringify(legacy))return structuredClone(defaults)
 return settings
}
const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')
export function parse(text,settings=defaults){
 const markers=settings.markers.filter(Boolean).sort((a,b)=>b.length-a.length)
 const separators=settings.separators.filter(Boolean).sort((a,b)=>b.length-a.length)
 if(!markers.length||!separators.length)throw Error('分隔符和各字符不能为空')
 const pattern=new RegExp(`^(.+?)(${markers.map(escape).join('|')})\\s*(\\d+(?:\\.\\d{1,2})?)\\s*$`)
 const split=new RegExp(separators.map(escape).join('|'))
 return text.split(/\r?\n/).map(s=>s.trim()).filter(Boolean).map((line,index)=>{
 const match=line.match(pattern);if(!match)throw Error(`第 ${index+1} 行格式不正确，请输入如 12.23.32各50`)
 const items=match[1].split(split).map(s=>s.trim()).filter(Boolean)
 if(!items.length)throw Error(`第 ${index+1} 行缺少分项内容`)
 const cents=Math.round(Number(match[3])*100)
 if(!Number.isSafeInteger(cents)||!Number.isSafeInteger(cents*items.length))throw Error('金额过大')
 return {source:line,items,cents,total:cents*items.length}
 })
}
