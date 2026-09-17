'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { I18nText } from '@/components/LocaleShell';
import AssetImageUploader from '@/components/AssetImageUploader';
import { createClient } from '@/lib/supabase/client';
import { createAssetSubmission, finalizeAssetImageUploads, prepareAssetImageUploads } from '@/app/submit/actions';

export default function SubmitPropertyForm() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');

    try {
      const form = event.currentTarget;
      const metadata = new FormData(form);
      const { assetId } = await createAssetSubmission(metadata);

      let failed = 0;
      if (files.length) {
        const { grants } = await prepareAssetImageUploads(assetId, files.map((file) => ({ name: file.name, type: file.type, size: file.size })));
        const supabase = createClient();
        const uploaded: Array<{ path: string; name: string; type: string; size: number }> = [];

        for (let index = 0; index < grants.length; index += 1) {
          const grant = grants[index];
          const file = files[index];
          const { error: uploadError } = await supabase.storage.from('property-images').uploadToSignedUrl(grant.path, grant.token, file, { contentType: file.type, upsert: false });
          if (uploadError) {
            failed += 1;
            continue;
          }
          uploaded.push({ path: grant.path, name: grant.name, type: grant.type, size: grant.size });
        }

        if (uploaded.length) await finalizeAssetImageUploads(assetId, uploaded);
      }

      router.push(`/workspace/assets?submitted=1${failed ? `&images_failed=${failed}` : ''}`);
    } catch (submitError) {
      console.error('Submit property failed', submitError);
      setError('Unable to submit this property. Please try again.');
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="form-grid">
      <label><I18nText id="Asset title"/><input name="title" required maxLength={200}/></label>
      <label><I18nText id="Asset type"/><select name="asset_type"><option value="land"><I18nText id="Land"/></option><option value="residential"><I18nText id="Residential"/></option><option value="commercial"><I18nText id="Commercial"/></option><option value="hotel"><I18nText id="Hotel"/></option><option value="hospitality"><I18nText id="Hospitality"/></option><option value="industrial"><I18nText id="Industrial"/></option><option value="mixed_use"><I18nText id="Mixed use"/></option><option value="development_project"><I18nText id="Development project"/></option><option value="infrastructure"><I18nText id="Infrastructure"/></option><option value="renewable_energy"><I18nText id="Renewable energy"/></option><option value="other"><I18nText id="Other"/></option></select></label>
      <label><I18nText id="Country code"/><input name="country_code" required maxLength={2} placeholder="JO"/></label>
      <label><I18nText id="City"/><input name="city" maxLength={120}/></label>
      <label><I18nText id="Area m²"/><input name="area_sqm" type="number" min="0"/></label>
      <label><I18nText id="Currency"/><input name="currency" defaultValue="USD" maxLength={3}/></label>
      <label><I18nText id="Asking price"/><input name="asking_price" type="number" min="0"/></label>
      <label className="full"><I18nText id="Public summary"/><textarea name="public_summary" rows={6} maxLength={4000}/></label>
      <AssetImageUploader inputName={null} onPreparedFiles={setFiles}/>
      {error && <div className="full" role="alert">{error}</div>}
      <div className="full"><button className="button primary" disabled={busy}>{busy ? <I18nText id="Submitting…"/> : <I18nText id="Submit Asset for Verification"/>}</button></div>
    </form>
  );
}
