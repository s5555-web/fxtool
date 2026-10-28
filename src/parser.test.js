import {test} from 'node:test';import assert from 'node:assert/strict';import {parse,defaults,upgradeSettings} from './parser.js';
test('保留重复号码，正确计算金额',()=>{const [r]=parse('12.23.32.45.12.1各50');assert.equal(r.total,30000);assert.equal(r.items.length,6)})
test('多行、自定义分隔符和小数',()=>{const r=parse('01++02每个0.10\n03各2',{markers:['每','每个','各'],separators:['++']});assert.equal(r[0].total,20);assert.equal(r[1].total,200)})
test('拒绝错误金额和缺少内容',()=>{for(const s of ['1.2各-2','1.2各1.234','各5','1.2','.,-=各5'])assert.throws(()=>parse(s))})
test('支持数字、文字以及混合内容',()=>{for(const [text,items,total] of [['1.2.3.4各1',['1','2','3','4'],400],['苹果.香蕉各2',['苹果','香蕉'],400],['甲,2-乙=4、中文各数1.25',['甲','2','乙','4','中文'],625]]){const [r]=parse(text);assert.deepEqual(r.items,items);assert.equal(r.total,total)}})
test('全部默认各字符自动识别且优先匹配较长字符',()=>{for(const marker of defaults.markers){const [r]=parse(`甲.乙${marker}3`);assert.deepEqual(r.items,['甲','乙']);assert.equal(r.total,600)}})
test('自定义文字分隔符和各字符，保留含各字的条目',()=>{const [r]=parse('各类商品++B款每份2.50',{separators:['++'],markers:['每','每份']});assert.deepEqual(r.items,['各类商品','B款']);assert.equal(r.total,500)})
test('升级旧默认配置并保留自定义配置',()=>{assert.deepEqual(upgradeSettings({separators:['.','。',',','，','、',' ','/','-'],markers:['各','每','每个','各个']}),defaults);const custom={separators:['/'],markers:['每']};assert.deepEqual(upgradeSettings(custom),custom)})
