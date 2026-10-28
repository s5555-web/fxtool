import {test} from 'node:test';import assert from 'node:assert/strict';import {parse} from './parser.js';
test('保留重复号码，正确计算金额',()=>{const [r]=parse('12.23.32.45.12.1各50');assert.equal(r.total,30000);assert.equal(r.items.length,6)})
test('多行、自定义分隔符和小数',()=>{const r=parse('01++02每个0.10\n03各2',{markers:['每','每个','各'],separators:['++']});assert.equal(r[0].total,20);assert.equal(r[1].total,200)})
test('拒绝错误金额和无效号码',()=>{for(const s of ['1.2各-2','1.2各1.234','abc各5','1.2'])assert.throws(()=>parse(s))})
