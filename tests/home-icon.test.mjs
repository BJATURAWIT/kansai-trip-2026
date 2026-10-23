import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import manifest from '../app/manifest.js';
const read=async path=>readFile(new URL('../'+path,import.meta.url),'utf8');
test('iPhone install manifest references actual icon endpoints',async()=>{
 const m=manifest();
 assert.equal(m.display,'standalone');
 assert.equal(m.start_url,'/');
 assert.equal(m.icons.some(x=>x.src==='/apple-icon'&&x.sizes==='180x180'),true);
 assert.equal(m.icons.some(x=>x.src==='/icon'&&x.sizes==='512x512'),true);
 const apple=await read('app/apple-icon.js');
 const icon=await read('app/icon.js');
 assert.match(apple,/width: 180, height: 180/);
 assert.match(icon,/width: 512, height: 512/);
 assert.match(await read('app/layout.js'),/appleWebApp/);
});
test('icon and manifest can load without trip PIN while HTML stays gated',async()=>{
 const middleware=await read('middleware.js');
 assert.match(middleware,/verifySessionToken/);
 assert.match(middleware,/icon\|apple-icon/);
 assert.match(middleware,/manifest\.webmanifest/);
});
