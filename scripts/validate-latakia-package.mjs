import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('docs/opportunities/latakia-coastal-land');
const record = JSON.parse(fs.readFileSync(path.join(root, 'opportunity.json'), 'utf8'));
const requiredFiles = ['EXECUTIVE-SUMMARY.md', 'DATA-ROOM-INDEX.md', 'DUE-DILIGENCE-CHECKLIST.md', 'NDA-DRAFT.md', 'INVESTOR-OUTREACH-PACKAGE.md', 'README.md'];

const failures = [];
if (record.status !== 'draft') failures.push('package must remain draft');
if (record.verificationStatus !== 'unverified') failures.push('verification status must remain unverified');
if (record.asset.area.squareMeters !== null) failures.push('square metre conversion must remain unset');
if (record.outreach.approvalRequiredBeforeSending !== true) failures.push('outreach approval gate must remain enabled');
for (const file of requiredFiles) if (!fs.existsSync(path.join(root, file))) failures.push(`missing ${file}`);
const summary = fs.readFileSync(path.join(root, 'EXECUTIVE-SUMMARY.md'), 'utf8');
if (!/Unverified/i.test(summary) || !/قيد التحقق/.test(summary)) failures.push('summary must disclose verification limits');
if (record.verificationStatus === 'verified_within_scope') failures.push('package must not claim verified within scope before review');
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(`Latakia package valid: ${requiredFiles.length + 1} files, draft/unverified, outreach approval required.`);
