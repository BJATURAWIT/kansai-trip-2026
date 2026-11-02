import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const page=fs.readFileSync(new URL('../app/page.js',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../app/globals.css',import.meta.url),'utf8');
test('navigation has seven tabs without a separate dining tab',()=>{
 const items=page.slice(page.indexOf('const tabItems = ['),page.indexOf('];',page.indexOf('const tabItems = [')));
 assert.equal((items.match(/id: '/g)||[]).length,7);
 assert.doesNotMatch(items,/id: 'dining'/);
 assert.ok(page.includes('<FoodDining day={day.day} prefs={prefs}/>'));
});
test('mobile navigation labels never wrap onto two lines',()=>{
 assert.match(css,/\.bottom-nav button span\{[^}]*white-space:nowrap/);
 assert.match(css,/\.bottom-nav button\{min-width:0\}/);
});
