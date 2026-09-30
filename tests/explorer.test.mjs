import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const source=readFileSync(new URL('../public/openpers/app.js',import.meta.url),'utf8');
const api=vm.runInNewContext(source.slice(0,source.indexOf("let filter='all'"))+'\n({freshness,selectPrograms,programFromHash,programs,venueMetrics})');
test('freshness changes at fourteen UTC days without changing program status',()=>{
 const p={checkedAt:'2026-09-01',status:'active'};
 assert.equal(api.freshness(p,Date.parse('2026-09-14T23:59:59Z')).stale,false);
 assert.equal(api.freshness(p,Date.parse('2026-09-15T00:00:00Z')).stale,true);
 assert.equal(p.status,'active');
});
test('network, status, query and favorites combine',()=>{
 const p=api.programs.find(p=>p.name==='Perpl');
 const opts={network:'Monad',query:'perpl',status:'active',favoritesOnly:true,favorites:[p.id]};
 assert.deepEqual(Array.from(api.selectPrograms(api.programs,opts),p=>p.name),['Perpl']);
 assert.equal(api.selectPrograms(api.programs,{...opts,favorites:[]}).length,0);
 assert.equal(api.selectPrograms(api.programs,{...opts,network:'Aptos'}).length,0);
});
test('market sorting keeps missing values below zero',()=>{
 api.venueMetrics.TestZero={volume:0};api.venueMetrics.TestHigh={volume:10};
 const items=['TestMissing','TestZero','TestHigh'].map(name=>({name,season:'',networks:[],status:'active'}));
 assert.deepEqual(Array.from(api.selectPrograms(items,{order:'volume'}),p=>p.name),['TestHigh','TestZero','TestMissing']);
});
test('shared routes accept known entries and reject malformed or unknown IDs',()=>{
 const id=api.programs[0].id;
 assert.equal(api.programFromHash('#dex/'+id).id,id);
 assert.equal(api.programFromHash('#dex/%E0%A4%A'),null);
 assert.equal(api.programFromHash('#dex/not-a-program'),null);
 assert.equal(api.programFromHash('#programs'),null);
});
