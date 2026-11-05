export function summarizeItems(records) {
 const totals=new Map()
 for(const record of records){
  for(const item of record.items){
   totals.set(item,(totals.get(item)||0)+record.cents)
  }
 }
 return Array.from(totals,([item,cents])=>({item,cents})).sort((a,b)=>a.item.localeCompare(b.item,'zh-CN',{numeric:true}))
}
