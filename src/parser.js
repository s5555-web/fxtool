export const defaultMappings={马:['1','13','25','37','49'],蛇:['2','14','26','38'],龙:['3','15','27','39'],兔:['4','16','28','40'],虎:['5','17','29','41'],牛:['6','18','30','42'],鼠:['7','19','31','43'],猪:['8','20','32','44'],狗:['9','21','33','45'],鸡:['10','22','34','46'],猴:['11','23','35','47'],羊:['12','24','36','48']}
export const defaults={mappings:defaultMappings,separators:[',','.','-','=','、'],markers:['各','各数','个','皆','全']}
export function upgradeSettings(settings){
 const legacy={separators:['.','。',',','，','、',' ','/','-'],markers:['各','每','每个','各个']}
 if(JSON.stringify(settings)===JSON.stringify(legacy))return structuredClone(defaults)
 return {...settings,mappings:settings.mappings??structuredClone(defaultMappings)}
}
const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')
export function parseLines(text,settings=defaults){
 const rows=[],errors=[],remaining=[]
 text.split(/\r?\n/).forEach((line,index)=>{
  if(!line.trim())return
  try{rows.push(...parse(line,settings))}
  catch(error){
   errors.push(`第 ${index+1} 行：${error.message.replace(/^第 \d+ 行/,'')}`)
   remaining.push(line)
  }
 })
 return {rows,errors,remaining:remaining.join('\n')}
}
export function parse(text,settings=defaults){
 const markers=settings.markers.filter(Boolean).sort((a,b)=>b.length-a.length)
 const separators=settings.separators.filter(Boolean).sort((a,b)=>b.length-a.length)
 if(!markers.length||!separators.length)throw Error('分隔符和各字符不能为空')
 const pattern=new RegExp(`^(.+?)(${markers.map(escape).join('|')})\\s*(\\d+(?:\\.\\d{1,2})?)\\s*$`)
 const split=new RegExp(separators.map(escape).join('|'))
 return text.split(/\r?\n/).map(s=>s.trim()).filter(Boolean).map((line,index)=>{
 const match=line.match(pattern);if(!match)throw Error(`第 ${index+1} 行格式不正确，请输入如 12.23.32各50`)
 const content=match[1].trim()
 const parts=(split.test(content)?content.split(split):Array.from(content)).map(s=>s.trim()).filter(Boolean)
 const mappings=settings.mappings??defaultMappings
 const items=parts.flatMap(item=>Object.hasOwn(mappings,item)?mappings[item]:[item])
 if(!items.length)throw Error(`第 ${index+1} 行缺少分项内容`)
 const cents=Math.round(Number(match[3])*100)
 if(!Number.isSafeInteger(cents)||!Number.isSafeInteger(cents*items.length))throw Error('金额过大')
 return {source:line,items,cents,total:cents*items.length}
 })
}
